'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// build-ocignis-shared/index.ts
var build_ocignis_shared_exports = {};
__export(build_ocignis_shared_exports, {
  BotBacktestConfigSchema: () => BotBacktestConfigSchema,
  BotBacktestInstanceSchema: () => BotBacktestInstanceSchema,
  BotConfigSchema: () => BotConfigSchema,
  BotInstanceSchema: () => BotInstanceSchema,
  FEE_RATE_BORROW: () => FEE_RATE_BORROW,
  FEE_RATE_TRADING: () => FEE_RATE_TRADING,
  KLINE_INTERVALS: () => KLINE_INTERVALS,
  STRATEGY_NAMES: () => STRATEGY_NAMES,
  SYMBOL_PAIRS: () => SYMBOL_PAIRS,
});
module.exports = __toCommonJS(build_ocignis_shared_exports);

// src/bot/common/types/KlineInterval.ts
var KLINE_INTERVALS = [
  '1s',
  '1m',
  // '3m',
  // '5m',
  // '15m',
  // '30m',
  '1h',
  // '2h',
  // '4h',
  // '6h',
  // '8h',
  // '12h',
  '1d',
  // '3d',
  '1w',
  '1M',
];

// src/bot/common/types/SymbolPair.ts
var SYMBOL_PAIRS = [
  // Available also on paper testing - Start
  // 'BTCBUSD',
  // 'ETHBUSD',
  // Available also on paper testing - End
  // 'SOLBUSD',
  'AVAXBUSD',
  'MATICBUSD',
];

// src/bot/common/consts/FEE_RATE.ts
var FEE_RATE_TRADING = {
  noFee: 0,
  spotTrading_Limit: 0.09,
  spotTrading_Market: 0.1,
  usdmFuturesTrading_Limit: 0.012,
  usdmFuturesTrading_Market: 0.03,
  coinmFuturesTrading_Limit: 0.01,
  coinmFuturesTrading_Market: 0.05,
};
var FEE_RATE_BORROW = {
  marginBorrowDailyInterest: 0.03,
};

// src/bot/strategies/StrategyName.ts
var STRATEGY_NAMES = ['SMA', 'CustomStrategy'];

// src/bot/Bot/types.ts
var import_zod4 = require('zod');

// src/bot/strategies/strategy_CustomStrategy/types.ts
var import_zod = require('zod');
var Strategy_CustomStrategy_ConfigSchema = import_zod.z.object({
  customStrategyParam: import_zod.z.string(),
  periodShort: import_zod.z.number().positive(),
  periodLong: import_zod.z.number().positive(),
});

// src/bot/strategies/strategy_SMA/types.ts
var import_zod2 = require('zod');
var Strategy_SMA_ConfigSchema = import_zod2.z.object({
  periodShort: import_zod2.z.number().positive(),
  periodLong: import_zod2.z.number().positive(),
});

// src/bot/Strategy/types.ts
var import_zod3 = require('zod');
var StrategyConfigSchema = import_zod3.z.object({
  symbolPair: import_zod3.z.enum(SYMBOL_PAIRS),
  /**
   *  Open position with relative entry amount of your balance.
   */
  entryAmountRelative: import_zod3.z.number().positive({ message: 'Must ba a positive number.' }),
  /**
   *  Get this info from exchange, it varies per asset.
   */
  assetDecimalPlaces: import_zod3.z.number().min(0).max(5),
});

// src/bot/Bot/types.ts
var BotConfigSchema = import_zod4.z.discriminatedUnion('strategyName', [
  import_zod4.z.object({
    strategyName: import_zod4.z.literal('SMA'),
    strategyConfig: StrategyConfigSchema,
    strategySpecificConfig: Strategy_SMA_ConfigSchema,
  }),
  import_zod4.z.object({
    strategyName: import_zod4.z.literal('CustomStrategy'),
    strategyConfig: StrategyConfigSchema,
    strategySpecificConfig: Strategy_CustomStrategy_ConfigSchema,
  }),
]);
var BotInstanceSchema = BotConfigSchema.and(
  import_zod4.z.object({
    name: import_zod4.z.string().min(1),
    description: import_zod4.z.string(),
  }),
);

// src/bot/BotBacktest/types.ts
var import_zod5 = require('zod');
var BacktestConfigSchema = import_zod5.z.object({
  balance_BUSD: import_zod5.z.number().positive(),
  startTime: import_zod5.z.date().min(/* @__PURE__ */ new Date('2017-01-01T00:00:00.000Z')),
  endTime: import_zod5.z.date().max(/* @__PURE__ */ new Date()),
  fee: import_zod5.z.number().nonnegative(),
});
var BotBacktestConfigSchema = BotConfigSchema.and(
  import_zod5.z.object({
    backtestConfig: BacktestConfigSchema,
  }),
);
var BotBacktestInstanceSchema = BotBacktestConfigSchema.and(
  import_zod5.z.object({
    name: import_zod5.z.string().min(1),
    description: import_zod5.z.string(),
  }),
);
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    BotBacktestConfigSchema,
    BotBacktestInstanceSchema,
    BotConfigSchema,
    BotInstanceSchema,
    FEE_RATE_BORROW,
    FEE_RATE_TRADING,
    KLINE_INTERVALS,
    STRATEGY_NAMES,
    SYMBOL_PAIRS,
  });
