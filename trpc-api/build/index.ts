// To achieve best tree shaking try to export files by exact file path where export is located. (https://github.com/egoist/tsup/issues/578)

export type { AppRouter } from "server/trpc/router";

export * from "bot/common/types";
export * from "bot/common/consts";
export { STRATEGY_NAMES } from "bot/strategies/StrategyName";

// Zod Schemas
export { BotConfigSchema, BotInstanceSchema } from "bot/Bot/types";
export {
  BotBacktestConfigSchema,
  BotBacktestInstanceSchema,
} from "bot/BotBacktest/types";
