terraform {
  required_providers {
    twilio = {
      source  = "twilio/twilio"
      version = ">=0.4.0"
    }
  }
}

resource "twilio_studio_flows_v2" "chat" {
  friendly_name  = "Chat Flow"
  status         = "published"
  definition = templatefile("../../studio/chat-flow.json", local.params)
}

resource "twilio_studio_flows_v2" "messaging" {
  friendly_name  = "Messaging Flow"
  status         = "published"
  definition = templatefile("../../studio/messaging-flow.json", local.params)
}

resource "twilio_studio_flows_v2" "voice" {
  friendly_name  = "Voice IVR"
  status         = "published"
  definition = templatefile("../../studio/voice-flow.json", local.params)
}

locals{
  params = {
    "WORKFLOW_SID" = var.workflow_sid
    "CHAT_CHANNEL_SID" = var.chat_channel_sid
    "VOICE_CHANNEL_SID" = var.voice_channel_sid
  }
}
