// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  ErrorParsingQueueExpression = 'QueueFilterParseNotification',
  ErrorParsingQueueExpressionWithOR = 'QueueFilterParseORsNotification',
  ErrorQueueNotFound = 'QueueFilterQueueNotFound',
  FilterOnly = 'PSTeamsViewFilterOnly',
  FilterContaining = 'PSTeamsViewFilterContaining',
  SelectItem = 'PSTeamsViewSelectItem',
  MultiSelectItems = 'PSTeamsViewMultiSelectItems',
  MultiSelectedItems = 'PSTeamsViewMultiSelectedItems',
  AgentSkills = 'PSTeamsViewAgentSkills',
  Department = 'PSTeamsViewDepartment',
  EmailAddress = 'PSTeamsViewEmailAddress',
  QueueEligibility = 'PSTeamsViewQueueEligibility',
  Team = 'PSTeamsViewTeam',
}

export const stringHook = () => ({
  'en-US': {
    [StringTemplates.ErrorParsingQueueExpression]: 'Failed to parse queue expression, ignoring queue filter.',
    [StringTemplates.ErrorParsingQueueExpressionWithOR]:
      "Unable to apply queue filters to queues containing OR'd expressions. Ignoring queue filter.",
    [StringTemplates.ErrorQueueNotFound]: 'Queue reference not found, ignoring queue filter',
    [StringTemplates.FilterOnly]: '{{selected}} only',
    [StringTemplates.FilterContaining]: 'Containing "{{selected}}"',
    [StringTemplates.SelectItem]: 'Select an item...',
    [StringTemplates.MultiSelectItems]: 'Select one or more items...',
    [StringTemplates.MultiSelectedItems]: 'Selected items:',
    [StringTemplates.AgentSkills]: 'Agent Skills',
    [StringTemplates.Department]: 'Department',
    [StringTemplates.EmailAddress]: 'Email Address',
    [StringTemplates.QueueEligibility]: 'Queue Eligibility',
    [StringTemplates.Team]: 'Team',
  },
});
