import { chatLink } from "@/links";

const endpoint = process.env.NEXT_PUBLIC_REQUEST_ENDPOINT ?? "";

const copyText = (text: string) => {
  const area = document.createElement("textarea");
  area.value = text;
  area.readOnly = true;
  area.className = "sr-only";
  document.body.append(area);
  area.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();

  if (!copied) navigator.clipboard?.writeText(text).catch(() => undefined);

  return copied;
};

type SendResult = "copied" | "copyFailed" | "sent" | "failed";

export const hasEndpoint = endpoint !== "";

export const copyAndOpenChat = (text: string): SendResult => {
  const copied = copyText(text);
  window.open(chatLink, "_blank", "noopener");

  return copied ? "copied" : "copyFailed";
};

export const postRequest = async (payload: {
  lang: string;
  contact: string;
  text: string;
  website: string;
}): Promise<SendResult> => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
};
