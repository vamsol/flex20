import * as Flex from '@twilio/flex-ui';
import { random } from 'lodash';

import { EncodedParams } from '../../../types/serverless';
import { getFeatureFlags } from '../../configuration';

async function delay<T>(ms: number, result?: T) {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
}

export default abstract class ApiService {
  readonly serverlessDomain: string;

  readonly serverlessProtocol: string;

  protected manager = Flex.Manager.getInstance();

  constructor() {
    const custom_data = getFeatureFlags() || {};

    // use serverless_functions_domain from ui_attributes, or .env or set as undefined

    this.serverlessProtocol = 'https';
    this.serverlessDomain = '';

    if (process.env?.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN)
      this.serverlessDomain = process.env?.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN;

    if (custom_data?.serverless_functions_domain) this.serverlessDomain = custom_data.serverless_functions_domain;

    if (custom_data?.serverless_functions_protocol) this.serverlessProtocol = custom_data.serverless_functions_protocol;

    if (custom_data?.serverless_functions_port) this.serverlessDomain += `:${custom_data.serverless_functions_port}`;

    if (!this.serverlessDomain) console.error('serverless_functions_domain is not set in flex config or env file');
  }

  protected buildBody(encodedParams: EncodedParams): string {
    return Object.keys(encodedParams).reduce((result, paramName, idx) => {
      if (encodedParams[paramName] === undefined) {
        return result;
      }
      if (idx > 0) {
        return `${result}&${paramName}=${encodedParams[paramName]}`;
      }
      return `${paramName}=${encodedParams[paramName]}`;
    }, '');
  }

  protected async fetchJsonWithReject<T>(url: string, config: RequestInit, attempts = 0): Promise<T> {
    return fetch(url, config)
      .then(async (response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .catch(async (error) => {
        // Try to return proper error message from both caught promises and Error objects
        // https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
        try {
          // Generic retry when calls return a 'too many requests' response
          // request is delayed by a random number which grows with the number of retries
          if (error.status === 429 && attempts < 10) {
            await delay(random(100, 750) + attempts * 100);
            return await this.fetchJsonWithReject<T>(url, config, attempts + 1);
          }
          return error.json().then((response: any) => {
            if (typeof response === 'object' && Object.keys(response).length > 0) {
              // Error response body is an actual JSON object with keys; return them all
              // eslint-disable-next-line no-throw-literal
              throw {
                status: error.status,
                ...response,
              };
            } else {
              // Error response body is not JSON
              // eslint-disable-next-line no-throw-literal
              throw {
                status: error.status,
                message: response,
              };
            }
          });
        } catch (e) {
          throw error;
        }
      });
  }
}
