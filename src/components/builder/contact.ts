export type Channel = "tg" | "wa";

type ChannelRules = {
  name: string;
  prefix: string;
  type: "text" | "tel";
  inputMode: "text" | "tel";
  autoComplete: string;
  placeholder: string;
  clean: (value: string) => string;
  isValid: (value: string) => boolean;
};

export const channels: Record<Channel, ChannelRules> = {
  tg: {
    name: "Telegram",
    prefix: "@",
    type: "text",
    inputMode: "text",
    autoComplete: "off",
    placeholder: "username",
    clean: (value) => value.trim(),
    isValid: (value) => /^[A-Za-z0-9_]{5,32}$/.test(value),
  },
  wa: {
    name: "WhatsApp",
    prefix: "+",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "7 700 000 00 00",
    clean: (value) => value.replace(/\D/g, ""),
    isValid: (value) => /^\d{10,15}$/.test(value),
  },
};

export const channelIds = Object.keys(channels) as Channel[];

export const formatContact = (channel: Channel, raw: string) => {
  const rules = channels[channel];
  const value = rules.clean(raw);

  return rules.isValid(value) ? `${rules.name} ${rules.prefix}${value}` : "";
};
