import { z } from 'zod';
import * as superjson from 'superjson';
import * as _trpc_server from '@trpc/server';
import * as express from 'express';
import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';

declare const STRATEGY_NAMES: readonly ['SMA', 'CustomStrategy'];
type StrategyName = (typeof STRATEGY_NAMES)[number];

type Kline = {
  close: number;
  volume: number;
  endTime: number;
};
type Klines = Array<Kline>;

declare const KLINE_INTERVALS: readonly ['1s', '1m', '1h', '1d', '1w', '1M'];
/**
 * Supported kline intervals.
 */
type KlineInterval = (typeof KLINE_INTERVALS)[number];

type PositionType = 'long' | 'short';
type PositionNeutral = {
  status: 'neutral';
};
type PositionOpen = {
  status: 'open';
  positionType: PositionType;
  entryOrderType: OrderType;
  entryTime: number;
  entryPrice: number;
  entryQuantity: number;
};
type PositionClosed = {
  status: 'closed';
  positionType: PositionType;
  entryOrderType: OrderType;
  entryTime: number;
  entryPrice: number;
  entryQuantity: number;
  exitOrderType: OrderType;
  exitTime: number;
  exitPrice: number;
  exitQuantity: number;
  roiAbsolute: number;
  roiRelative: number;
};
type Position = PositionNeutral | PositionOpen | PositionClosed;
declare const ORDER_TYPE: readonly ['MARKET', 'LIMIT'];
type OrderType = (typeof ORDER_TYPE)[number];

declare const SYMBOL_COINS: readonly ['BUSD', 'USDT', 'BTC', 'ETH', 'SOL', 'AVAX', 'MATIC'];
type SymbolCoin = (typeof SYMBOL_COINS)[number];
type SymbolCoins = ReadonlyArray<SymbolCoin>;

declare const SYMBOL_PAIRS: readonly ['AVAXBUSD', 'MATICBUSD'];
type SymbolPair = (typeof SYMBOL_PAIRS)[number];
type SymbolPairs = ReadonlyArray<SymbolPair>;

type Trade = {
  time: number;
  price: number;
  quantity: number;
  volume: number;
};
type Trades = Array<Trade>;

declare const StrategyConfigSchema: z.ZodObject<
  {
    symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
    /**
     *  Open position with relative entry amount of your balance.
     */
    entryAmountRelative: z.ZodNumber;
    /**
     *  Get this info from exchange, it varies per asset.
     */
    assetDecimalPlaces: z.ZodNumber;
  },
  'strip',
  z.ZodTypeAny,
  {
    symbolPair: 'AVAXBUSD' | 'MATICBUSD';
    entryAmountRelative: number;
    assetDecimalPlaces: number;
  },
  {
    symbolPair: 'AVAXBUSD' | 'MATICBUSD';
    entryAmountRelative: number;
    assetDecimalPlaces: number;
  }
>;
type StrategyConfig = z.infer<typeof StrategyConfigSchema>;
type StrategyConstructor = {
  strategyConfig: StrategyConfig;
  balance_BUSD: number;
  trades: Trades;
};
type SignalPositionOpen = {
  positionType: PositionType;
  orderType: OrderType;
  quantity: number;
};
type SearchSignalPositionOpenReturn = SignalPositionOpen | null;
type SearchSignalPositionCloseParams = {
  positionType: PositionType;
  quantity: number;
};
type SignalPositionClose = {
  orderType: OrderType;
  quantity: number;
};
type SearchSignalPositionCloseReturn = SignalPositionClose | null;

declare abstract class Strategy {
  private readonly MAX_TRADES_IN_BUFFER;
  protected abstract readonly _strategyName: StrategyName;
  protected _strategyConfig: StrategyConfig;
  private _balance_BUSD;
  private _trades;
  constructor({ strategyConfig, balance_BUSD, trades }: StrategyConstructor);
  /**
   * Latest trades are added at the end of the array.
   */
  get trades(): Trades;
  get balance_BUSD(): number;
  set balance_BUSD(value: number);
  update({ newTrade }: { newTrade: Trade }): void;
  abstract searchSignalPositionOpen(): SearchSignalPositionOpenReturn;
  abstract searchSignalPositionClose(params: SearchSignalPositionCloseParams): SearchSignalPositionCloseReturn;
}

declare const appRouter: _trpc_server.CreateRouterInner<
  _trpc_server.RootConfig<{
    ctx: {
      req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
      res: express.Response<any, Record<string, any>>;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: typeof superjson.default;
  }>,
  {
    bot: _trpc_server.CreateRouterInner<
      _trpc_server.RootConfig<{
        ctx: {
          req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
          res: express.Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: typeof superjson.default;
      }>,
      {
        commands: _trpc_server.CreateRouterInner<
          _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: typeof superjson.default;
          }>,
          {
            run: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: {
                  botConfig:
                    | {
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'SMA';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                        };
                      }
                    | {
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'CustomStrategy';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                          customStrategyParam: string;
                        };
                      };
                };
                _input_out: {
                  botConfig:
                    | {
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'SMA';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                        };
                      }
                    | {
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'CustomStrategy';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                          customStrategyParam: string;
                        };
                      };
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              void
            >;
            stop: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: {
                  botId: string;
                };
                _input_out: {
                  botId: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              void
            >;
            status: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: {
                  botId: string;
                };
                _input_out: {
                  botId: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              | {
                  botFsm: 'idle' | 'initializing' | 'initialized' | 'running' | 'stopping';
                  position: Position;
                  strategy: Strategy | undefined;
                }
              | undefined
            >;
          }
        >;
        instances: _trpc_server.CreateRouterInner<
          _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: typeof superjson.default;
          }>,
          {
            destroy: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: {
                  name: string;
                };
                _input_out: {
                  name: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              void
            >;
            list: _trpc_server.BuildProcedure<
              'query',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: typeof _trpc_server.unsetMarker;
                _input_out: typeof _trpc_server.unsetMarker;
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
                _meta: object;
              },
              ((
                | {
                    strategyConfig: {
                      symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                      entryAmountRelative: number;
                      assetDecimalPlaces: number;
                    };
                    strategyName: 'SMA';
                    strategySpecificConfig: {
                      periodShort: number;
                      periodLong: number;
                    };
                  }
                | {
                    strategyConfig: {
                      symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                      entryAmountRelative: number;
                      assetDecimalPlaces: number;
                    };
                    strategyName: 'CustomStrategy';
                    strategySpecificConfig: {
                      periodShort: number;
                      periodLong: number;
                      customStrategyParam: string;
                    };
                  }
              ) & {
                name: string;
                description: string;
              })[]
            >;
            upsert: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: (
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'SMA';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                      };
                    }
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'CustomStrategy';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                        customStrategyParam: string;
                      };
                    }
                ) & {
                  name: string;
                  description: string;
                };
                _input_out: (
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'SMA';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                      };
                    }
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'CustomStrategy';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                        customStrategyParam: string;
                      };
                    }
                ) & {
                  name: string;
                  description: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              void
            >;
          }
        >;
      }
    >;
    botBacktest: _trpc_server.CreateRouterInner<
      _trpc_server.RootConfig<{
        ctx: {
          req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
          res: express.Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: typeof superjson.default;
      }>,
      {
        commands: _trpc_server.CreateRouterInner<
          _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: typeof superjson.default;
          }>,
          {
            run: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: {
                  botBacktestConfig:
                    | ({
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'SMA';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                        };
                      } & {
                        backtestConfig: {
                          balance_BUSD: number;
                          startTime: Date;
                          endTime: Date;
                          fee: number;
                        };
                      })
                    | ({
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'CustomStrategy';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                          customStrategyParam: string;
                        };
                      } & {
                        backtestConfig: {
                          balance_BUSD: number;
                          startTime: Date;
                          endTime: Date;
                          fee: number;
                        };
                      });
                  isIncluded_data_tradesDataset: boolean;
                };
                _input_out: {
                  botBacktestConfig:
                    | ({
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'SMA';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                        };
                      } & {
                        backtestConfig: {
                          balance_BUSD: number;
                          startTime: Date;
                          endTime: Date;
                          fee: number;
                        };
                      })
                    | ({
                        strategyConfig: {
                          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                          entryAmountRelative: number;
                          assetDecimalPlaces: number;
                        };
                        strategyName: 'CustomStrategy';
                        strategySpecificConfig: {
                          periodShort: number;
                          periodLong: number;
                          customStrategyParam: string;
                        };
                      } & {
                        backtestConfig: {
                          balance_BUSD: number;
                          startTime: Date;
                          endTime: Date;
                          fee: number;
                        };
                      });
                  isIncluded_data_tradesDataset: boolean;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              {
                readonly stats: {
                  readonly strategyConfig: {
                    readonly name: 'SMA' | 'CustomStrategy';
                    readonly symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                    readonly entryAmountRelative: `${number}%`;
                  };
                  readonly botExecutionTime: {
                    readonly strategyExecutionTime: string;
                    readonly dataAcquisitionTime: string;
                    readonly allTime: string;
                  };
                  readonly market: {
                    readonly startPrice: `${number}$`;
                    readonly endPrice: `${number}$`;
                    readonly change: {
                      readonly absolute: `${string}$`;
                      readonly relative: `${string}%`;
                    };
                    readonly datasetSizeNumOfTrades: number;
                    readonly priceMin: string | 0;
                    readonly priceMax: string | 0;
                    readonly priceMean: string | 0;
                    readonly priceMedian: string | 0;
                    readonly priceStandardDeviation: string | 0;
                    readonly priceVariance: string | 0;
                  };
                  readonly time: {
                    readonly start: Date;
                    readonly end: Date;
                    readonly timespan: string;
                  };
                  readonly balance: {
                    readonly start: `${string}$`;
                    readonly end: `${string}$`;
                    readonly change: {
                      readonly absolute: `${string}$`;
                      readonly relative: `${string}%`;
                    };
                  };
                  readonly tradingStats: {
                    readonly fee: `${number}%`;
                    readonly numOfPositionsClosed: number;
                    readonly numOfTrades: number;
                    readonly numOfPositionsClosedWithProfit: number;
                    readonly numOfPositionsClosedWithLoss: number;
                    readonly positionsClosedSuccessRatio: string | 0;
                    readonly positionsClosedMeanProfit: string | 0;
                    readonly positionsClosedMeanLoss: string | 0;
                  };
                };
                readonly data: {
                  readonly tradesDataset: Trades;
                  readonly positionsClosed: readonly PositionClosed[];
                };
              }
            >;
          }
        >;
        instances: _trpc_server.CreateRouterInner<
          _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: typeof superjson.default;
          }>,
          {
            destroy: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: {
                  name: string;
                };
                _input_out: {
                  name: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              void
            >;
            list: _trpc_server.BuildProcedure<
              'query',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: typeof _trpc_server.unsetMarker;
                _input_out: typeof _trpc_server.unsetMarker;
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
                _meta: object;
              },
              (((
                | {
                    strategyConfig: {
                      symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                      entryAmountRelative: number;
                      assetDecimalPlaces: number;
                    };
                    strategyName: 'SMA';
                    strategySpecificConfig: {
                      periodShort: number;
                      periodLong: number;
                    };
                  }
                | {
                    strategyConfig: {
                      symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                      entryAmountRelative: number;
                      assetDecimalPlaces: number;
                    };
                    strategyName: 'CustomStrategy';
                    strategySpecificConfig: {
                      periodShort: number;
                      periodLong: number;
                      customStrategyParam: string;
                    };
                  }
              ) & {
                backtestConfig: {
                  balance_BUSD: number;
                  startTime: Date;
                  endTime: Date;
                  fee: number;
                };
              }) & {
                name: string;
                description: string;
              })[]
            >;
            upsert: _trpc_server.BuildProcedure<
              'mutation',
              {
                _config: _trpc_server.RootConfig<{
                  ctx: {
                    req: express.Request<
                      express_serve_static_core.ParamsDictionary,
                      any,
                      any,
                      qs.ParsedQs,
                      Record<string, any>
                    >;
                    res: express.Response<any, Record<string, any>>;
                  };
                  meta: object;
                  errorShape: _trpc_server.DefaultErrorShape;
                  transformer: typeof superjson.default;
                }>;
                _meta: object;
                _ctx_out: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >;
                  res: express.Response<any, Record<string, any>>;
                };
                _input_in: ((
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'SMA';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                      };
                    }
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'CustomStrategy';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                        customStrategyParam: string;
                      };
                    }
                ) & {
                  backtestConfig: {
                    balance_BUSD: number;
                    startTime: Date;
                    endTime: Date;
                    fee: number;
                  };
                }) & {
                  name: string;
                  description: string;
                };
                _input_out: ((
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'SMA';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                      };
                    }
                  | {
                      strategyConfig: {
                        symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                        entryAmountRelative: number;
                        assetDecimalPlaces: number;
                      };
                      strategyName: 'CustomStrategy';
                      strategySpecificConfig: {
                        periodShort: number;
                        periodLong: number;
                        customStrategyParam: string;
                      };
                    }
                ) & {
                  backtestConfig: {
                    balance_BUSD: number;
                    startTime: Date;
                    endTime: Date;
                    fee: number;
                  };
                }) & {
                  name: string;
                  description: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
              },
              void
            >;
          }
        >;
      }
    >;
    logs: _trpc_server.CreateRouterInner<
      _trpc_server.RootConfig<{
        ctx: {
          req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
          res: express.Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: typeof superjson.default;
      }>,
      {
        triggerAll: _trpc_server.BuildProcedure<
          'query',
          {
            _config: _trpc_server.RootConfig<{
              ctx: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >;
                res: express.Response<any, Record<string, any>>;
              };
              meta: object;
              errorShape: _trpc_server.DefaultErrorShape;
              transformer: typeof superjson.default;
            }>;
            _ctx_out: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
          },
          string
        >;
        destroy: _trpc_server.BuildProcedure<
          'query',
          {
            _config: _trpc_server.RootConfig<{
              ctx: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >;
                res: express.Response<any, Record<string, any>>;
              };
              meta: object;
              errorShape: _trpc_server.DefaultErrorShape;
              transformer: typeof superjson.default;
            }>;
            _ctx_out: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
          },
          string | undefined
        >;
        show: _trpc_server.BuildProcedure<
          'query',
          {
            _config: _trpc_server.RootConfig<{
              ctx: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >;
                res: express.Response<any, Record<string, any>>;
              };
              meta: object;
              errorShape: _trpc_server.DefaultErrorShape;
              transformer: typeof superjson.default;
            }>;
            _meta: object;
            _ctx_out: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >;
              res: express.Response<any, Record<string, any>>;
            };
            _input_in: {
              logType: 'error' | 'all';
              logDate?: string | undefined;
            };
            _input_out: {
              logType: 'error' | 'all';
              logDate?: string | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
          },
          {
            data: {
              logType: 'error' | 'all';
              logDate?: string | undefined;
            };
          }
        >;
      }
    >;
  }
>;
type AppRouter = typeof appRouter;

/**
 * @description Fee per trade.
 * @link https://www.binance.com/en/fee/schedule
 */
declare const FEE_RATE_TRADING: {
  readonly noFee: 0;
  readonly spotTrading_Limit: 0.09;
  readonly spotTrading_Market: 0.1;
  readonly usdmFuturesTrading_Limit: 0.012;
  readonly usdmFuturesTrading_Market: 0.03;
  readonly coinmFuturesTrading_Limit: 0.01;
  readonly coinmFuturesTrading_Market: 0.05;
};
declare const FEE_RATE_BORROW: {
  readonly marginBorrowDailyInterest: 0.03;
};

declare const BotConfigSchema: z.ZodDiscriminatedUnion<
  'strategyName',
  [
    z.ZodObject<
      {
        strategyName: z.ZodLiteral<'SMA'>;
        strategyConfig: z.ZodObject<
          {
            symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
            entryAmountRelative: z.ZodNumber;
            assetDecimalPlaces: z.ZodNumber;
          },
          'strip',
          z.ZodTypeAny,
          {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          },
          {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          }
        >;
        strategySpecificConfig: z.ZodObject<
          {
            periodShort: z.ZodNumber;
            periodLong: z.ZodNumber;
          },
          'strip',
          z.ZodTypeAny,
          {
            periodShort: number;
            periodLong: number;
          },
          {
            periodShort: number;
            periodLong: number;
          }
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        strategyConfig: {
          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
          entryAmountRelative: number;
          assetDecimalPlaces: number;
        };
        strategyName: 'SMA';
        strategySpecificConfig: {
          periodShort: number;
          periodLong: number;
        };
      },
      {
        strategyConfig: {
          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
          entryAmountRelative: number;
          assetDecimalPlaces: number;
        };
        strategyName: 'SMA';
        strategySpecificConfig: {
          periodShort: number;
          periodLong: number;
        };
      }
    >,
    z.ZodObject<
      {
        strategyName: z.ZodLiteral<'CustomStrategy'>;
        strategyConfig: z.ZodObject<
          {
            symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
            entryAmountRelative: z.ZodNumber;
            assetDecimalPlaces: z.ZodNumber;
          },
          'strip',
          z.ZodTypeAny,
          {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          },
          {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          }
        >;
        strategySpecificConfig: z.ZodObject<
          {
            customStrategyParam: z.ZodString;
            periodShort: z.ZodNumber;
            periodLong: z.ZodNumber;
          },
          'strip',
          z.ZodTypeAny,
          {
            periodShort: number;
            periodLong: number;
            customStrategyParam: string;
          },
          {
            periodShort: number;
            periodLong: number;
            customStrategyParam: string;
          }
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        strategyConfig: {
          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
          entryAmountRelative: number;
          assetDecimalPlaces: number;
        };
        strategyName: 'CustomStrategy';
        strategySpecificConfig: {
          periodShort: number;
          periodLong: number;
          customStrategyParam: string;
        };
      },
      {
        strategyConfig: {
          symbolPair: 'AVAXBUSD' | 'MATICBUSD';
          entryAmountRelative: number;
          assetDecimalPlaces: number;
        };
        strategyName: 'CustomStrategy';
        strategySpecificConfig: {
          periodShort: number;
          periodLong: number;
          customStrategyParam: string;
        };
      }
    >,
  ]
>;
declare const BotInstanceSchema: z.ZodIntersection<
  z.ZodDiscriminatedUnion<
    'strategyName',
    [
      z.ZodObject<
        {
          strategyName: z.ZodLiteral<'SMA'>;
          strategyConfig: z.ZodObject<
            {
              symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
              entryAmountRelative: z.ZodNumber;
              assetDecimalPlaces: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            },
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            }
          >;
          strategySpecificConfig: z.ZodObject<
            {
              periodShort: z.ZodNumber;
              periodLong: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              periodShort: number;
              periodLong: number;
            },
            {
              periodShort: number;
              periodLong: number;
            }
          >;
        },
        'strip',
        z.ZodTypeAny,
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'SMA';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
          };
        },
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'SMA';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
          };
        }
      >,
      z.ZodObject<
        {
          strategyName: z.ZodLiteral<'CustomStrategy'>;
          strategyConfig: z.ZodObject<
            {
              symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
              entryAmountRelative: z.ZodNumber;
              assetDecimalPlaces: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            },
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            }
          >;
          strategySpecificConfig: z.ZodObject<
            {
              customStrategyParam: z.ZodString;
              periodShort: z.ZodNumber;
              periodLong: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              periodShort: number;
              periodLong: number;
              customStrategyParam: string;
            },
            {
              periodShort: number;
              periodLong: number;
              customStrategyParam: string;
            }
          >;
        },
        'strip',
        z.ZodTypeAny,
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'CustomStrategy';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
            customStrategyParam: string;
          };
        },
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'CustomStrategy';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
            customStrategyParam: string;
          };
        }
      >,
    ]
  >,
  z.ZodObject<
    {
      name: z.ZodString;
      description: z.ZodString;
    },
    'strip',
    z.ZodTypeAny,
    {
      name: string;
      description: string;
    },
    {
      name: string;
      description: string;
    }
  >
>;

declare const BotBacktestConfigSchema: z.ZodIntersection<
  z.ZodDiscriminatedUnion<
    'strategyName',
    [
      z.ZodObject<
        {
          strategyName: z.ZodLiteral<'SMA'>;
          strategyConfig: z.ZodObject<
            {
              symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
              entryAmountRelative: z.ZodNumber;
              assetDecimalPlaces: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            },
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            }
          >;
          strategySpecificConfig: z.ZodObject<
            {
              periodShort: z.ZodNumber;
              periodLong: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              periodShort: number;
              periodLong: number;
            },
            {
              periodShort: number;
              periodLong: number;
            }
          >;
        },
        'strip',
        z.ZodTypeAny,
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'SMA';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
          };
        },
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'SMA';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
          };
        }
      >,
      z.ZodObject<
        {
          strategyName: z.ZodLiteral<'CustomStrategy'>;
          strategyConfig: z.ZodObject<
            {
              symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
              entryAmountRelative: z.ZodNumber;
              assetDecimalPlaces: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            },
            {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            }
          >;
          strategySpecificConfig: z.ZodObject<
            {
              customStrategyParam: z.ZodString;
              periodShort: z.ZodNumber;
              periodLong: z.ZodNumber;
            },
            'strip',
            z.ZodTypeAny,
            {
              periodShort: number;
              periodLong: number;
              customStrategyParam: string;
            },
            {
              periodShort: number;
              periodLong: number;
              customStrategyParam: string;
            }
          >;
        },
        'strip',
        z.ZodTypeAny,
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'CustomStrategy';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
            customStrategyParam: string;
          };
        },
        {
          strategyConfig: {
            symbolPair: 'AVAXBUSD' | 'MATICBUSD';
            entryAmountRelative: number;
            assetDecimalPlaces: number;
          };
          strategyName: 'CustomStrategy';
          strategySpecificConfig: {
            periodShort: number;
            periodLong: number;
            customStrategyParam: string;
          };
        }
      >,
    ]
  >,
  z.ZodObject<
    {
      backtestConfig: z.ZodObject<
        {
          balance_BUSD: z.ZodNumber;
          startTime: z.ZodDate;
          endTime: z.ZodDate;
          fee: z.ZodNumber;
        },
        'strip',
        z.ZodTypeAny,
        {
          balance_BUSD: number;
          startTime: Date;
          endTime: Date;
          fee: number;
        },
        {
          balance_BUSD: number;
          startTime: Date;
          endTime: Date;
          fee: number;
        }
      >;
    },
    'strip',
    z.ZodTypeAny,
    {
      backtestConfig: {
        balance_BUSD: number;
        startTime: Date;
        endTime: Date;
        fee: number;
      };
    },
    {
      backtestConfig: {
        balance_BUSD: number;
        startTime: Date;
        endTime: Date;
        fee: number;
      };
    }
  >
>;
declare const BotBacktestInstanceSchema: z.ZodIntersection<
  z.ZodIntersection<
    z.ZodDiscriminatedUnion<
      'strategyName',
      [
        z.ZodObject<
          {
            strategyName: z.ZodLiteral<'SMA'>;
            strategyConfig: z.ZodObject<
              {
                symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
                entryAmountRelative: z.ZodNumber;
                assetDecimalPlaces: z.ZodNumber;
              },
              'strip',
              z.ZodTypeAny,
              {
                symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                entryAmountRelative: number;
                assetDecimalPlaces: number;
              },
              {
                symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                entryAmountRelative: number;
                assetDecimalPlaces: number;
              }
            >;
            strategySpecificConfig: z.ZodObject<
              {
                periodShort: z.ZodNumber;
                periodLong: z.ZodNumber;
              },
              'strip',
              z.ZodTypeAny,
              {
                periodShort: number;
                periodLong: number;
              },
              {
                periodShort: number;
                periodLong: number;
              }
            >;
          },
          'strip',
          z.ZodTypeAny,
          {
            strategyConfig: {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            };
            strategyName: 'SMA';
            strategySpecificConfig: {
              periodShort: number;
              periodLong: number;
            };
          },
          {
            strategyConfig: {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            };
            strategyName: 'SMA';
            strategySpecificConfig: {
              periodShort: number;
              periodLong: number;
            };
          }
        >,
        z.ZodObject<
          {
            strategyName: z.ZodLiteral<'CustomStrategy'>;
            strategyConfig: z.ZodObject<
              {
                symbolPair: z.ZodEnum<['AVAXBUSD', 'MATICBUSD']>;
                entryAmountRelative: z.ZodNumber;
                assetDecimalPlaces: z.ZodNumber;
              },
              'strip',
              z.ZodTypeAny,
              {
                symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                entryAmountRelative: number;
                assetDecimalPlaces: number;
              },
              {
                symbolPair: 'AVAXBUSD' | 'MATICBUSD';
                entryAmountRelative: number;
                assetDecimalPlaces: number;
              }
            >;
            strategySpecificConfig: z.ZodObject<
              {
                customStrategyParam: z.ZodString;
                periodShort: z.ZodNumber;
                periodLong: z.ZodNumber;
              },
              'strip',
              z.ZodTypeAny,
              {
                periodShort: number;
                periodLong: number;
                customStrategyParam: string;
              },
              {
                periodShort: number;
                periodLong: number;
                customStrategyParam: string;
              }
            >;
          },
          'strip',
          z.ZodTypeAny,
          {
            strategyConfig: {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            };
            strategyName: 'CustomStrategy';
            strategySpecificConfig: {
              periodShort: number;
              periodLong: number;
              customStrategyParam: string;
            };
          },
          {
            strategyConfig: {
              symbolPair: 'AVAXBUSD' | 'MATICBUSD';
              entryAmountRelative: number;
              assetDecimalPlaces: number;
            };
            strategyName: 'CustomStrategy';
            strategySpecificConfig: {
              periodShort: number;
              periodLong: number;
              customStrategyParam: string;
            };
          }
        >,
      ]
    >,
    z.ZodObject<
      {
        backtestConfig: z.ZodObject<
          {
            balance_BUSD: z.ZodNumber;
            startTime: z.ZodDate;
            endTime: z.ZodDate;
            fee: z.ZodNumber;
          },
          'strip',
          z.ZodTypeAny,
          {
            balance_BUSD: number;
            startTime: Date;
            endTime: Date;
            fee: number;
          },
          {
            balance_BUSD: number;
            startTime: Date;
            endTime: Date;
            fee: number;
          }
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        backtestConfig: {
          balance_BUSD: number;
          startTime: Date;
          endTime: Date;
          fee: number;
        };
      },
      {
        backtestConfig: {
          balance_BUSD: number;
          startTime: Date;
          endTime: Date;
          fee: number;
        };
      }
    >
  >,
  z.ZodObject<
    {
      name: z.ZodString;
      description: z.ZodString;
    },
    'strip',
    z.ZodTypeAny,
    {
      name: string;
      description: string;
    },
    {
      name: string;
      description: string;
    }
  >
>;

export {
  AppRouter,
  BotBacktestConfigSchema,
  BotBacktestInstanceSchema,
  BotConfigSchema,
  BotInstanceSchema,
  FEE_RATE_BORROW,
  FEE_RATE_TRADING,
  KLINE_INTERVALS,
  Kline,
  KlineInterval,
  Klines,
  OrderType,
  Position,
  PositionClosed,
  PositionType,
  STRATEGY_NAMES,
  SYMBOL_PAIRS,
  SymbolCoin,
  SymbolCoins,
  SymbolPair,
  SymbolPairs,
  Trade,
  Trades,
};
