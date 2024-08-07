import { z } from "zod";
import {
  ZLegacySurveyQuestions,
  ZLegacySurveyThankYouCard,
  ZLegacySurveyWelcomeCard,
} from "./legacy-surveys";
import { ZProductConfigChannel, ZProductConfigIndustry } from "./product";
import {
  ZSurveyHiddenFields,
  ZSurveyQuestions,
  ZSurveyThankYouCard,
  ZSurveyWelcomeCard,
} from "./surveys/types";
import { ZUserObjective } from "./user";

export const ZTemplateRole = z.enum(["productManager", "customerSuccess", "marketing", "sales"]);
export type TTemplateRole = z.infer<typeof ZTemplateRole>;

export const ZTemplate = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.any().optional(),
  role: ZTemplateRole.optional(),
  channels: z.array(z.enum(["link", "app", "website"])).optional(),
  industries: z.array(z.enum(["eCommerce", "saas", "other"])).optional(),
  objectives: z.array(ZUserObjective).optional(),
  preset: z.object({
    name: z.string(),
    welcomeCard: ZSurveyWelcomeCard,
    questions: ZSurveyQuestions,
    thankYouCard: ZSurveyThankYouCard,
    hiddenFields: ZSurveyHiddenFields,
  }),
});

export type TTemplate = z.infer<typeof ZTemplate>;

export const ZLegacyTemplate = ZTemplate.extend({
  preset: z.object({
    name: z.string(),
    welcomeCard: ZLegacySurveyWelcomeCard,
    questions: ZLegacySurveyQuestions,
    thankYouCard: ZLegacySurveyThankYouCard,
    hiddenFields: ZSurveyHiddenFields,
  }),
});

export type TLegacyTemplate = z.infer<typeof ZLegacyTemplate>;

export const ZTemplateFilter = z.union([
  ZProductConfigChannel,
  ZProductConfigIndustry,
  ZTemplateRole,
  z.null(),
]);

export type TTemplateFilter = z.infer<typeof ZTemplateFilter>;
