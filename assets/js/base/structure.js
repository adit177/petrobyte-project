/*
 ---------------------------------------------
 @@structure.js
 ------------
 have the structure of all the code.
 * n: have the name of that page
 * p: have the path of that page
 * c: have the children of that page
 * t: have the tables of that page
 * g: have the graphs of that page
 ---------------------------------------------
 */
const pb = {
  dsb: {
    n         : 'dashboards',
    charts    : {
      n       : 'charts',
      business: {
        n: 'business',
        p: {
          sales  : 'sales',
          working: 'working',
          heads  : 'heads'
        },
        c: {
          mode: {
            chart: 'chart',
            table: 'table',
          }
        }
      },
      stock   : {
        n: 'stock',
        p: {
          trade: 'business-trade',
          stock: 'stock-flow',
          sales: 'sales-break'
        }
      },
      profit  : {
        n: 'profit',
        p: {
          trade: 'items-trade',
          gross: 'gross-profit',
          item : 'profit-item'
        }
      },
      customer: {
        n: 'customers',
        p: {
          volume : 'credit-volume',
          balance: 'customer-balance'
        }
      }
    },
    statistics: {
      n        : 'statistics',
      customers: {
        n: 'customers',
        p: {},
        t: {
          customer_list: 'customer_list',
          receipt_list : "receipt_list",
        },
        g: {
          month  : 'month',
          quarter: 'quarter',
          year   : 'year'
        },
        c: {
          month  : 'month',
          quarter: 'quarter',
          year   : 'year',
        }
      },
      business : {
        n: 'business',
        p: {
          header : 'header',
          summary: 'summary',
        }
      },
      products : {
        n: 'products',
        p: {}
      },
      finance  : {
        n: 'finance',
        p: {}
      }
    }
  },
  opr: {
    n           : 'operations',
    transactions: {
      n            : 'transactions',
      c            : {},
      sales        : {
        n: 'sales',
        p: {
          credit  : 'credit',
          cash    : 'cash',
          separate: 'separate',
          regular : 'regular'
        },
        t: {
          transactions: 'transactions',
        },
        c: {}
      },
      purchases    : {
        n: 'purchases',
        p: {
          fuel   : 'fuel',
          oil    : 'oil',
          goods  : 'goods',
          expense: 'expense'
        },
        t: {
          transactions: 'transactions',
        },
        c: {}
      },
      banking      : {
        n: 'banking',
        p: {
          deposit   : 'deposit',
          withdrawal: 'withdrawal',
          transfer  : 'transfer',
          clearance : 'clearance',
        },
        t: {
          transactions: 'transactions',
          clearance   : 'clearance',
          modal       : 'modal',
          modal_child : 'modal_child',
        },
        c: {
          sub: {
            unsettled: 'unsettled'
          },
        }
      },
      receipts     : {
        n: 'receipts',
        p: {
          customer: 'customer',
          contact : 'contact',
          income  : 'income',
          transact: 'transact'
        },
        t: {
          transactions : 'transactions',
          unpaidEntries: 'unpaidEntries',
          unpaidBills  : 'unpaidBills',
          interest     : 'interest'
        },
        c: {
          customer: {
            n       : 'customer',
            entry   : 'rc_unpaid_entries',
            bills   : 'rc_unpaid_bills',
            interest: 'rc_int_table'
          },
        }
      },
      payments     : {
        n: 'payments',
        p: {
          supplier: 'supplier',
          expense : 'expense',
          salary  : 'salary',
          vendor  : 'vendor',
          loans   : 'loans',
          drawing : 'drawing',
        },
        t: {
          transactions: 'transactions',
          vendor      : 'vendor',
          emi         : 'emi',
        },
        c: {
          sub     : {
            unpaid_bills: 'unpaid_bills',
          },
          supplier: 'supplier',
          bills   : 'bills',
          vendor  : 'vendor',
          invoices: 'invoices',
          employee: 'employee',
          salary  : 'salary',
          emi     : 'emi',
        }
      },
      journals     : {
        n: 'journals',
        a: false,
        p: {
          entry: 'entry',
        },
        c: {}
      },
      miscellaneous: {
        n: '',
        p: {}
      }
    },
    shifts      : {
      n       : 'shifts',
      control : {
        n: 'control',
        p: {},
      },
      listing : {
        n: 'listing',
        p: {}
      },
      overview: {
        n: 'overview',
        p: {}
      },
      process : {
        n: 'process',
        p: {
          nozzle       : 'nozzle',
          reading      : 'reading',
          shiftDetails : 'shiftDetails',
          table        : 'table',
          selectNozzles: 'selectNozzles',
        },
        c: {},
        t: {
          list   : 'list',
          nozzles: 'nozzles'
        }
      }

    },
    stocks      : {
      n         : 'stocks',
      incoming  : {
        n: 'incoming',
        p: {
          simple : 'simple',
          advance: 'advance'
        },
        c: {
          tank             : 'tank',
          dip              : 'dip',
          calcNozzleSale   : 'calculateNozzlesSale',
          totalReceivedCalc: 'totalReceivedCalc',
        }
      },
      inspection: {
        n: 'inspection',
        p: {}
      },
      movement  : {
        n: 'movement',
        p: {
          fuel: 'fuel',
          lube: 'lube'
        }
      },
      transfer  : {
        n: 'transfer',
        p: {
          tank    : 'tank',
          air     : 'air',
          location: 'location',
          stocks  : 'stocks'

        },
        c: {
          warehouse  : 'warehouse',
          items      : 'items',
          storage    : 'storage',
          assignitems: 'assignitems',
        }
      },
    },
    employees   : {
      n         : 'employees',
      activities: {
        n: 'activities',
        p: {
          absent  : 'absent',
          overtime: 'overtime',
          expense : 'expense',
        },

      },
      salary    : {
        n: 'salary',
        p: {
          result : 'result',
          present: 'present',
        },
        t: {
          list          : 'list',
          salary_breakup: 'salary_breakup',
        },
        c: {}
      },
      payroll   : {
        n: 'payroll',
        p: {}
      }
    },

    loyalty: {
      n      : 'loyalty',
      instant: {
        n: 'instant',
        p: {}
      },
      render : {
        n: 'render',
        p: {}
      }
    },
    indents: {
      n     : 'indents',
      orders: {
        n: 'orders',
        p: {}
      },
      tokens: {
        n: 'tokens',
        p: {}
      }
    }
  },
  mng: {
    n        : 'management',
    products : {
      n      : 'products',
      add    : {
        layout: 'buttons',
        n     : 'add',
        p     : {
          fuels                  : 'fuels',
          lubes                  : 'lubes',
          goods                  : 'goods',
          services               : 'services',
          create_nozzles         : 'create_nozzles',
          create_stores          : 'create_stores',
          create_product_category: 'create_product_category'

        },
        c     : {
          fuels: {
            l: 'stepper',
            p: {
              item  : 'item',
              tank  : 'tanks',
              mpd   : 'mpd',
              nozzle: 'nozzle',
            }
          }
        }
      },
      listing: {
        n: 'listing',
        p: {
          cards: 'cards',
          table: 'table',
        },
        t: {
          list: 'list',
        }
      },
      detail : {
        n: 'detail',
        p: {
          overview : 'overview',
          sales    : 'sales',
          purchases: 'purchases',
          config   : 'config'
        },
        t: {

          sales    : 'sales',
          purchases: 'purchases',
        },
        g: {
          year_sale_a: 'year_sale_a',
        }

      },
      setting: {
        n: 'setting',
        p: {}
      }
    },
    accounts : {
      n: 'accounts',

      ledgers  : {
        n: 'ledgers',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },
        t: {
          list    : 'list',
          receipts: 'receipts',
          payments: 'payments',

        },
        c: {
          chart: {
            balance    : 'balance',
            transaction: 'transaction'
          },
          tab  : {
            general : 'general',
            receipts: 'receipts',
            payments: 'payments'
          },
          form : {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          }
        }
      },
      banks    : {
        n: 'banks',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },
        t: {
          list    : 'list',
          deposits: 'deposits',
          expenses: 'expenses',
          payments: 'payments',
          receipts: 'receipts',

        },
        c: {
          chart: {
            balance    : 'balance',
            transaction: 'transaction'
          },
          tab  : {
            general : 'general',
            receipts: 'receipts',
            payments: 'payments',
            expenses: 'expenses',
            deposits: 'deposits'
          },
          form : {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          }
        }
      },
      gateways : {
        n: 'gateways',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },
        t: {
          list       : 'list',
          settlements: 'settlements',
          sales      : 'sales',
          customer   : 'customer',

        },
        c: {
          chart: {
            balance    : 'balance',
            transaction: 'transaction'
          },

          tab : {
            general          : 'general',
            settlements      : 'settlements',
            sales_receipts   : 'sales_receipts',
            customer_receipts: 'customer_receipts'
          },
          form: {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          }
        }
      },
      loans    : {
        n: 'loans',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },
        t: {
          list        : 'list',
          upcomingEmi : 'upcomingEmi',
          repayments  : 'repayments',
          installments: 'installments'

        },
        c: {
          chart  : {
            balance    : 'balance',
            transaction: 'transaction'
          },
          tab    : {
            general     : 'general',
            upcomingEmi : 'upcomingEmi',
            repayments  : 'repayments',
            newLoan     : 'new_loan',
            oldLoan     : 'old_loan',
            installments: 'installments',
          },
          form   : {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          },
          eValues: {
            rate: 'rate',

          }
        }
      },
      contacts : {
        n: 'contacts',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },
        t: {
          list   : 'list',
          receipt: 'receipt',
          payment: 'payment',
        },
        g: {
          balance    : 'balance',
          transaction: 'transaction'
        },
        c: {
          tab: {
            general : 'general',
            receipts: 'receipts',
            payments: 'payments'
          },
        }
      },
      suppliers: {
        n: 'suppliers',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'add'
        },

        t: {
          list       : 'list',
          purchases  : 'purchases',
          payments   : 'payments',
          deducations: 'deducations',
          incentives : 'incentives',

        },
        c: {
          chart: {
            balance    : 'balance',
            transaction: 'transaction'
          },
          tab  : {
            general   : 'general',
            purchases : 'purchases',
            payments  : 'payments',
            deductions: 'deductions',
            incentives: 'incentives'
          },
          form : {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          }
        }
      },
      vendors  : {
        n: 'vendors',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },

        c: {
          chart: {
            balance    : 'balance',
            transaction: 'transaction'
          },
          tab  : {
            general : 'general',
            bills   : 'bills',
            payments: 'payments',
            dues    : 'dues'
          },
          form : {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          }
        },
        t: {
          list   : 'list',
          bills  : 'bills',
          payment: 'payment',
          dues   : 'dues',
        },
      },
      expenses : {
        n: 'expenses',
        p: {
          start: 'start',
          new  : 'new',
          edit : 'edit',
          list : 'list',
          view : 'view',
          cate : 'cate'
        },
        t: {
          list     : 'list',
          datewise : 'datewise',
          monthwise: 'monthwise',
          details  : 'details',


        },
        c: {
          chart: {
            balance    : 'balance',
            transaction: 'transaction'
          },
          tab  : {
            general  : 'general',
            datewise : 'datewise',
            monthwise: 'monthwise',
            details  : 'details'
          },
          form : {
            save   : 'save',
            delete : 'delete',
            disable: 'disable',
            update : 'update',
            class  : 'class'
          }
        }
      },
      setting  : {
        n: 'setting',
        p: {
          default: 'default',
          balance: 'balance',
          update : 'updateInfo'
        }
      }
    },
    customers: {
      n      : 'customers',
      add    : {
        n: 'add',
        p: {
          add    : 'add',
          bulk   : 'bulk',
          upload : 'upload',
          vehicle: 'vehicle'
        },
        c: {
          table: 'table'
        }
      },
      listing: {
        n: 'listing',
        p: {
          cards: 'cards',
          table: 'table',
        },
        t: {
          list: 'list',
        }
      },
      detail : {
        n: 'detail',
        p: {
          overview: 'overview',
          charts  : 'charts',
          profits : 'profits',
          vehicles: 'vehicles',
          interest: 'interest'
        },
        t: {
          receipts         : 'receipts_records',
          invoices         : "paid_invoices",
          monthly_statement: "monthly_statement",
          vehicles         : "vehicles",
          basic_interest   : "basic_interest",
          custom_interest  : "custom_interest",
        },
        g: {
          year_sale_a: 'year_sale_a',
          year_sale_b: 'year_sale_b',
          year_sale_c: 'year_sale_c'
        },
        c: {
          update: 'update_customer',
          alter : 'alter_customer',
          edit  : 'edit_vehicles',
          merge : 'merge_vehicles'
        }
      }
    },
    employees: {
      n      : 'employees',
      add    : {
        n: 'add',
        p: {
          step     : 'step',
          details  : 'details',
          payroll  : 'payroll',
          completed: 'completed',
          type     : 'type',
        },
        t: {
          list: 'list',
        }
      },
      listing: {
        n: 'listing',
        p: {
          cards: 'cards',
          table: 'table',
        },
        t: {
          list: 'list',
        },
        c: {
          cards: {
            search : 'search',
            advance: 'advance',
            close  : 'close'
          }
        }
      },
      detail : {
        n: 'detail',
        p: {
          overview  : 'overview',
          activities: 'activities',
          payroll   : 'payroll',
          account   : 'account',
        },
        t: {
          history   : "transaction_history",
          activities: "activities",
          payroll   : "payroll"
        },
        c: {
          edit: 'edit'
        }
      }
    },
    billing  : {
      n       : 'billing',
      bucket  : {
        n: 'bucket',
        p: {
          customer: 'customer',
          month   : 'month',
          status  : 'status',
        },
        t: {
          customer: 'customer',
          month   : 'month',
          status  : 'status',
        },
      },
      display : {
        n: 'display',
        p: {
          bill    : 'bill',
          customer: 'customer',
          result  : 'result',
          present : 'present',
        },
        t: {
          list          : 'list',
          detail_invoice: 'detail_invoice',
          summary       : 'summary',
        },
        c: {}
      },
      create  : {
        n: 'create',
        p: {},
        t: {
          list          : 'list',
          detail_invoice: 'detail_invoice',
          summary       : 'summary',
        },
      },
      generate: {
        n: 'generate',
        p: {
          recurring: 'recurring',
          frequency: 'frequency',
          direct   : 'direct'
        },
        t: {
          customer_list: "customer_list",
        },
        c: {}
      },
      view    : {
        n: 'view',
        p: {}
      }
    },
    tokens   : {
      b: {
        n: '',
        p: {}
      }
    },
    loyalty  : {
      n      : 'loyalty',
      renders: {
        n: 'renders',
        p: {}
      },
      rewards: {
        n: 'rewards',
        p: {}
      }
    },
    users    : {
      n      : 'users',
      add    : {
        n: 'add',
        p: {
          account: 'account',
          role   : 'role',
          login  : 'login',
          status : 'status',
          item   : 'item',
          tank   : 'tank',
          mdp    : 'mdp',
          nozzle : 'nozzle',
        }
      },
      listing: {
        n: 'listing',
        p: {
          cards: 'cards',
          table: 'table',
        },
        t: {
          list: 'list',
        }
      },
      detail : {
        n: 'detail',
        p: {
          overview: 'overview',
          security: 'security',
          events  : 'events'
        },
        t: {
          login_sessions: 'login_sessions',
          logs          : 'logs'
        },
        c: {
          sessions       : 'login_session',
          logs           : 'logs',
          update_user    : "update_user",
          update_email   : "update_email",
          update_password: "update_password",
          update_role    : "update_role",
          add_otp        : "add_otp",
        }
      },
      setting: {
        n: 'setting',
        p: {
          permissions: 'permissions',
          roles      : 'roles',
        }
      }
    },
    drive    : {
      folders: {
        n: 'folders',
        p: {}
      },
      files  : {
        n: 'files',
        p: {}
      },
      setting: {
        n: 'setting',
        p: {}
      }
    }
  },
  rpt: {
    n        : 'reports',
    general  : {
      n        : 'general',
      shift    : {
        n: 'shift',
        p: {}
      },
      balance  : {
        n: 'balance',
        p: {}
      },
      board    : {
        n: 'board',
        p: {}
      },
      dsr      : {
        n: 'dsr',
        p: {
          petroleum : 'petroleum',
          lubricants: 'lubricants',
        }
      },
      onepage  : {
        n: 'onepage',
        p: {
          cash_flow_summary              : "cash_flow_summary",
          item_wise_fuel_sale_detail     : "item_wise_fuel_sale_detail",
          fuel_sale_collection_detail    : "fuel_sale_collection_detail",
          collection_summary             : "collection_summary_table",
          account_and_item_wise_credit   : "account_and_item_wise_credit",
          account_and_item_wise_lubricant: "account_and_item_wise_lubricant",
          receipts_transactions          : "receipts_transactions",
          payment_transactions           : "payments_transactions",
          contra_transactions            : "contra_transactions",
          purchases                      : "purchases",
        }
      },
      rocket   : {
        n: 'rocket',
        p: {
          nozzle_wise_summary     : "nozzle_wise_summary",
          tank_wise_summary       : "tank_wise_summary",
          petroleum_fuel_inventory: "petroleum_fuel_inventory",
          lubricant_inventory     : "lubricant_inventory",
          fuel_sale_collection    : "fuel_sale_collection",
          lube_collection         : "lube_collection",
          nozzle_sales_summary    : "nozzle_sales_summary",
          cash_flow_accounts      : "cash_flow_accounts",
          customers_summary       : "customers_summary",
          credit_sales            : "credit_sales",
          debited_accounts        : "debited_accounts",
          credited_accounts       : "credited_accounts",
          contra                  : "contra",
          receipt_vouchers        : "receipt_vouchers",
          payment_vouchers        : "payment_vouchers",
        }
      },
      transacts: {
        n: 'transacts',
        p: {}
      }
    },
    petroleum: {
      n        : 'petroleum',
      flowsheet: {
        n: 'flowsheet',
        p: {
          years  : "sea",
          months : "lake",
          days   : "river",
          dayInfo: "pond",
          //          sea  : "years",
          //          lake : "months",
          //          river: "days",
          //          pond : "dayInfo",
        }
      },
      overview : {
        n: 'overview',
        p: {
          basic_overview: "basic_overview",
          storage       : "storage",
          incoming      : "incoming",
          shortage      : "shortage",
        }
      },
      rates    : {
        n: 'rates',
        p: {
          simple    : 'simple',
          difference: "difference",
          valuation : "valuation",
          advance   : "advance"
        }
      },
      pistol   : {
        n: 'pistol',
        p: {
          item    : 'item',
          combined: 'combined'
        }
      },
      summary  : {
        n: 'summary',
        p: {
          quick     : 'quick',
          standard  : 'standard',
          advance   : 'advance',
          collection: "collection"
        }
      },
      report   : {
        n: 'report',
        p: {}
      },
      stock    : {
        n: 'stock',
        p: {}
      },
    },
    products : {
      n        : 'products',
      sales    : {
        n: 'sales',
        p: {
          category: 'category',
          item    : 'item',
          customer: 'customer',
          advance : 'advance'
        },
      },
      purchases: {
        n: 'purchases',
        p: {
          category: 'category',
          item    : 'item',
          supplier: 'supplier',
          invoice : 'invoice'
        },
      },
      stocks   : {
        n: 'stocks',
        p: {
          item    : 'item',
          location: 'location'
        }
      }
    },
    accounts : {
      n        : 'accounts',
      lists    : {
        n: 'lists',
        p: {
          masters: "masters",
          heads  : "heads",
          groups : "groups",
          ledgers: "ledgers",
          summary: "summary"
        }
      },
      summary  : {
        n: 'summary',
        p: {}
      },
      register : {
        n: 'register',
        p: {
          search     : 'search',
          transaction: 'transaction',
          summary    : 'summary',
          charts     : 'charts'
        },
        c: {
          chart: {
            debited    : 'debited',
            credited   : 'credited',
            balance    : 'balance',
            transaction: 'transaction'
          }
        }
      },
      statement: {
        n: 'statement',
        p: {
          search : 'search',
          report : 'report',
          summary: 'summary',
          charts : 'charts'
        },
        c: {
          chart: {
            debited_account : 'debited-accounts',
            credited_account: 'credited-accounts',
            balance         : 'balance-flow',
            transaction     : 'transaction'
          }
        }
      },
      wave     : {
        n: 'wave',
        p: {
          wave    : "wave",
          interest: "interest",
          summary : "summary",
        }
      },
      group    : {
        n: 'group',
        p: {
          sea: "sea"
        }
      },
      interest : {
        n: 'interest',
        p: {
          search : 'search',
          report : 'report',
          summary: 'summary',
          charts : 'charts'
        }
      },
    },
    customers: {
      n           : 'customers',
      sales       : {
        n: 'sales',
        p: {
          direct : 'direct',
          group  : 'group',
          vehicle: 'vehicle'
        }
      },
      transactions: {
        n: 'transactions',
        p: {
          simple   : 'simple',
          detailed : 'detailed',
          statement: 'statement'
        }
      },
      bills       : {
        n: 'bills',
        p: {
          view     : 'view',
          statement: 'statement',
          customer : 'customer'
        }
      },
      indents     : {
        n: 'indents',
        p: {
          bucket  : 'bucket',
          period  : 'period',
          book    : 'book',
          customer: 'customer'
        }
      },
      summary     : {
        n: 'summary',
        p: {
          accounts: 'accounts',
          trade   : 'trade',
          group   : 'group'
        }
      },
    },
    employees: {
      n       : 'employees',
      salary  : {
        n: 'salary',
        p: {
          payroll: 'payroll',
          ledger : 'ledger',
          slip   : 'slip'
        }
      },
      activity: {
        n: 'activity',
        p: {
          absences  : 'absences',
          overtime  : 'overtime',
          expenses  : 'expenses',
          collection: 'collection',
          commission: 'commission'
        }
      },
      combined: {
        n: 'combined',
        p: {
          activities: 'activities',
          salary    : 'salary',
          commission: "commission",
          credits   : "credits",
          collection: "collection",
        }
      }
    },
  },
  tax: {
    n        : 'taxation',
    standard : {
      n        : 'standard',
      gst      : {
        n: 'gst',
        p: {}
      },
      incometax: {
        n: 'incometax',
        p: {}
      },
      tcs      : {
        n: 'tcs',
        p: {}
      },
      tds      : {
        n: 'tds',
        p: {}
      },
      vat      : {
        n: 'vat',
        p: {}
      }
    },
    gstreport: {
      n        : 'gstreport',
      sales    : {
        n: 'sales',
        p: {
          detailed: 'detailed',
          invoice : 'invoice',
          item    : 'item',
          party   : 'party'
        }
      },
      purchases: {
        n: 'purchases',
        p: {
          detailed: 'detailed',
          invoice : 'invoice',
          item    : 'item',
          party   : 'party'
        }
      }
    },
    vatreport: {
      n        : 'vatreport',
      combined : {
        n: 'combined',
        p: {}
      },
      overview : {
        n: 'overview',
        p: {}
      },
      purchases: {
        n: 'purchases',
        p: {}
      },
      sales    : {
        n: 'sales',
        p: {}
      }
    },
    gstreturn: {
      n         : 'gstreturn',
      fetch2b   : {
        n: 'fetch2b',
        p: {}
      },
      gstrone   : {
        n: 'gstrone',
        p: {}
      },
      gstrthreeb: {
        n: 'gstrthreeb',
        p: {}
      }
    },
    vatreturn: {
      n     : 'vatreturn',
      form_a: {
        n: 'form_a',
        p: {}
      },
      form_b: {
        n: 'form_b',
        p: {}
      }
    },
  },
  fin: {
    n        : 'financials',
    balance  : {
      n         : 'balance',
      standard  : {
        n: 'standard',
        p: {
          sheet: 'sheet',
          trans: 'transact',
          modal: 'modals'
        },
        t: {
          transact: 'transact'
        }
      },
      tformat   : {
        n: 'tformat',
        p: {
          sheet: 'sheet',
          trans: 'transact',
          modal: 'modals'
        },
        t: {
          transact: 'transact'

        }
      },
      summary   : {
        n: 'summary',
        p: {
          sheet: 'sheet',
          trans: 'transact',
          modal: 'modals'
        },
        t: {
          transact: 'transact'

        }
      },
      detailed  : {
        n: 'detailed',
        p: {}
      },
      comparison: {
        n: 'comparison',
        p: {
          sheet: 'sheet',
          trans: 'transact',
          modal: 'modals'
        },
        t: {
          transact: 'transact'

        }
      },
      schedule  : {
        n: 'schedule',
        p: {}
      },
    },
    profit   : {
      n         : 'profit',
      comparison: {
        n: 'comparison',
        p: {
          sheet: 'sheet'
        }
      },
      clients   : {
        n: 'clients',
        p: {
          sheet: 'sheet',
          trans: 'transact',
          modal: 'modals'
        }
      },
      days      : {
        n: 'days',
        p: {
          sheet: 'sheet'
        }
      },
      detailed  : {
        n: 'detailed',
        p: {
          sheet: 'sheet'
        }
      },
      months    : {
        n: 'months',
        p: {
          sheet: 'sheet'
        }
      },
      rates     : {
        n: 'rates',
        p: {
          sheet: 'sheet'
        }
      },
      schedule  : {
        n: 'schedule',
        p: {}
      },
      standard  : {
        n: 'standard',
        p: {
          sheet: 'sheet'
        }
      }
    },
    statement: {
      n          : 'statement',
      cashflow   : {
        n: 'cashflow',
        p: {
          years  : "sea",
          months : "lake",
          days   : "river",
          dayInfo: "pond",
        }
      },
      negative   : {
        n: 'negative',
        p: {}
      },
      receipts   : {
        n: 'receipts',
        p: {}
      },
      transaction: {
        n: 'transaction',
        p: {}
      },
      trial      : {
        n: 'trial',
        p: {}
      }
    },
    reconcile: {
      n       : 'reconciliation',
      summary : {
        n: 'summary',
        p: {}
      },
      initiate: {
        n: 'initiate',
        p: {}
      }
    },
    general  : {
      n: 'general',
      b: {
        n: '',
        p: {}
      },
    }
  },
  com: {
    n       : 'communication',
    chats   : {
      n       : 'chats',
      message : {
        n: 'message',
        p: {}
      },
      whatsapp: {
        n: 'whatsapp',
        p: {}
      },
      email   : {
        n   : "email",
        mail: {
          n: "mail"
        }
      }

    },
    message : {
      n     : 'message',
      single: {
        n: 'single',
        p: {
          panel  : 'panel',
          history: 'history'
        }
      },
      group : {
        n: 'group',
        p: {}
      }
    },
    whatsapp: {
      n     : 'whatsapp',
      group : {
        n: 'group',
        p: {}
      },
      single: {
        n: 'single',
        p: {}
      },
    },
    email   : {
      n       : 'email',
      compose : {
        n: 'compose',
        p: {}
      },
      mail    : {
        n: 'mail',
        p: {},
        t: {
          list: "list",
        }
      },
      template: {
        n: 'template',
        p: {}
      },
    },
    diary   : {
      n       : 'diary',
      calendar: {
        n: 'calendar',
        p: {}
      },
      tasks   : {
        n: 'tasks',
        p: {}
      }
    },
  },
  set: {
    n            : 'setting',
    profile      : {
      n       : 'profile',
      account : {
        n: 'account',
        p: {
          change_email: "change_email",
        },
        c: {
          deactivate: "deactivate"
        }
      },
      billing : {
        n: 'billing',
        p: {},
        t: {
          failed : 'billing_failed',
          success: 'billing_success'
        },
        g: {},
        c: {}
      },
      invoice : {
        n: 'invoice',
        p: {
          page: 'page'
        }
      },
      logs    : {
        n: 'logs',
        p: {},
        t: {
          sessions: 'login_sessions'
        },
        g: {},
        c: {}
      },
      overview: {
        n: 'overview',
        p: {
          details: 'details'
        },
      },
      referral: {
        n: 'referral',
        p: {},
        t: {
          year: 'referral_year',
          time: 'referral_time'
        },
        g: {},
        c: {}
      },
      security: {
        n: 'security',
        p: {},
        t: {
          admin_enable : 'admin_enable',
          admin_disable: 'admin_disable',
          user_enable  : 'user_enable',
          user_disable : 'user_disable',
          use          : 'device_use'
        },
        g: {},
        c: {}
      },
      wallet  : {
        n: 'wallet',
        p: {},
        t: {
          this_year: 'referrals_one',
          last_year: 'referrals_two'
        },
        g: {},
        c: {}
      }
    },
    method       : {
      n     : 'method',
      sample: {
        n: 'sample',
        p: {
          top   : 'top',
          right : 'right',
          left  : 'left',
          bottom: 'bottom'
        },
        t: {
          date       : 'date',
          amount     : 'amount',
          number     : "number",
          badge      : "badge",
          account    : "account",
          text       : "text",
          note       : "note",
          checkbox   : "checkbox",
          image      : "image",
          icon       : "icon",
          rich       : "rich",
          status     : "status",
          button     : "button",
          dropdownBtn: "dropdownBtn",
          option     : "option",
          input      : "input"

        }
      }
    },
    configs      : {
      n            : 'configs',
      accounting   : {
        n: 'accounting',
        p: {
          accounting: 'accounting',
          shifts    : 'shifts',
          stock     : 'stock',
          employees : 'employees',
          customers : 'customers'
        }
      },
      basic        : {
        n: 'basic',
        p: {
          basic        : 'basic',
          accounting   : 'accounting',
          shifts       : 'shifts',
          stock        : 'stock',
          employees    : 'employees',
          customers    : 'customers',
          report       : 'report',
          notifications: 'notifications',
          sms          : 'sms',
          whatsapp     : 'whatsapp',
          database     : 'database',
          miscellaneous: 'miscellaneous'
        }
      },
      communication: {
        n: 'communication',
        p: {
          notifications: 'notifications',
          sms          : 'sms',
          whatsapp     : 'whatsapp',
          email        : 'email'
        }
      },
      database     : {
        n: 'database',
        p: {
          database : 'database',
          databooks: 'databooks',
          backup   : 'backup',
          cleanup  : 'cleanup'
        }
      },
      miscellaneous: {
        n: 'miscellaneous',
        p: {
          simple       : 'simple',
          miscellaneous: 'miscellaneous',
        }
      },
      reports      : {
        n: 'reports',
        p: {
          basic     : 'basic',
          customers : 'customers',
          shifts    : 'shifts',
          stock     : 'stock',
          employees : 'employees',
          financials: 'financials',
        }
      },
    },
    exports      : {
      n    : 'exports',
      excel: {
        n: 'excel',
        p: {
          params: 'params',
          select: 'select',
          verify: 'verify',
          export: 'export'
        }
      },
      tally: {
        n: 'tally',
        p: {
          params: 'params',
          range : 'range',
          select: 'select',
          verify: 'verify',
          export: 'export'
        }
      }
    },
    intel        : {
      n         : 'intel',
      management: {
        n: 'management',
        p: {}
      },
      onboard   : {
        n: 'onboard',
        p: {}
      },
      operation : {
        n: 'operation',
        p: {}
      },
      taxation  : {
        n: 'taxation',
        p: {}
      },
      health    : {
        n: 'health',
        p: {
          accounting: 'accounting',
          inventory : 'inventory',
          petroleum : 'petroleum',
        },
        t: {
          sale    : 'sale',
          purchase: "purchase",
          receipt : "receipt",
          payment : "payment",
          journal : "journal",
          contra  : "contra",
          items   : "items",
          stocks  : "stocks",
          inputs  : "inputs",
          shift   : "shift",
          collect : "collect",
        },
        g: {},
        c: {}
      }
    },
    subscriptions: {
      n      : 'subscriptions',
      add    : {
        n: 'add',
        p: {},
        t: {add_product: 'add_product'},
        g: {},
        c: {
          add_product        : 'add_product',
          addon              : 'addon_form',
          create_subscription: 'create_subscription',
          delete             : 'delete',
        }
      },
      detail : {
        n: 'detail',
        p: {}
      },
      listing: {
        n: 'listing',
        p: {}
      }
    },
  },
  sam: {
    n      : 'samples',
    extends: {
      n        : 'extends',
      append   : {
        n: 'append',
        p: {
          single_string : 'single_string',
          single_element: 'single_element',
          loop_string   : 'loop_string',
          loop_element  : 'loop_element',
        },
        t: {},
      },
      collect  : {
        n: 'collect',
        p: {
          page    : 'page',
          basic   : 'basic',
          standard: 'standard',
          plugin  : 'plugin',
          simple  : 'simple',
          nested  : 'nested',
          advance : 'advance',
          table   : 'table',
        },
        t: {},
      },
      filter   : {
        n: 'filter',
        p: {},
        t: {},
      },
      foreign  : {
        n: 'foreign',
        p: {
          combined  : 'combined',
          individual: 'individual',
          acquire   : 'acquire',
          state     : 'state',
          table     : 'table',
          branch    : 'branch',
        },
        t: {
          fore: 'foreign',
        },
      },
      placement: {
        n: 'placement',
        p: {
          page    : 'page',
          basic   : 'basic',
          standard: 'standard',
          plugin  : 'plugin',
          simple  : 'simple',
          nested  : 'nested',
          advance : 'advance',
          table   : 'table',
        },
        t: {},
      },
      reset    : {
        n: 'reset',
        p: {
          page    : 'page',
          basic   : 'basic',
          standard: 'standard',
          plugin  : 'plugin',
          simple  : 'simple',
          nested  : 'nested',
          advance : 'advance',
          table   : 'table',
        },
        t: {},
      },
      search   : {
        n: 'search',
        p: {},
        t: {},
      },
      stepper  : {
        n: 'stepper',
        p: {},
        t: {},
      }
    },
    layouts: {
      n    : 'layouts',
      tabs : {
        n: 'tabs',
        p: {},
        t: {},
      },
      cards: {
        n: 'cards',
        p: {},
        t: {},
      },
    },
    plugins: {
      n         : 'plugins',
      alert     : {
        n: 'alert',
        p: {
          alert    : 'alert',
          toast    : 'toast',
          autoclose: 'autoclose',
          minimal  : 'minimal',
          confirm  : 'confirm',
        },
        t: {},
      },
      charts    : {
        n: 'charts',
        p: {},
        t: {},
      },
      datatables: {
        n: 'datatables',
        p: {},
        t: {},
      },
      dates     : {
        n: 'dates',
        p: {
          simple : 'simple',
          advance: 'advance',
          enable : 'enable',
          disable: 'disable',
        },
        t: {},
      },
      validation: {
        n: 'validation',
        p: {
          page    : 'page',
          basic   : 'basic',
          standard: 'standard',
          plugin  : 'plugin',
          simple  : 'simple',
          nested  : 'nested',
          advance : 'advance',
          table   : 'table',
        },
        t: {},
      },
      keen      : {
        n: 'keen',
        p: {},
        t: {},
      },
      mask      : {
        n: 'mask',
        p: {
          number : 'number',
          global : 'global',
          connect: 'connect',
          other  : 'other',
        },
        t: {},
      },
      range     : {
        n: 'range',
        p: {
          common: 'common',
          tax   : 'tax',
          report: 'report',
          fiscal: 'fiscal'
        },
        t: {},
      },
      select    : {
        n: 'select',
        p: {
          simple  : 'simple',
          accounts: 'accounts',
          person  : 'person',
          custom  : 'custom',
          text    : 'text',
          tag     : 'tag',
        },
        t: {},
      },
      tagify    : {
        n: 'tagify',
        p: {
          tag    : 'tag',
          select : 'select',
          inout  : 'inout',
          outin  : 'outin',
          advance: 'advance',
        },
        t: {},
      },
      repeater  : {
        n: 'repeater',
        p: {
          page    : 'page',
          basic   : 'basic',
          standard: 'standard',
          plugin  : 'plugin',
          simple  : 'simple',
          nested  : 'nested',
          advance : 'advance',
        },
        t: {},
      }
    },
    renders: {
      n      : 'renders',
      commons: {
        n: 'commons',
        p: {},
      },
      forms  : {
        n: 'forms',
        p: {
          select: 'select',
          tagify: 'tagify',
          range : 'range',
        },
      },
      menus  : {
        n: 'menus',
        p: {
          value : 'value',
          stack : 'stack',
          bar   : 'bar',
          button: 'button',
        },
      },
      tables : {
        n: 'tables',
        p: {
          date    : 'date',
          amount  : 'amount',
          account : "account",
          text    : "text",
          note    : "note",
          checkbox: "checkbox",
          dropdown: "dropdown",
          number  : "number",
          input   : "input",
          badge   : "badge",
          image   : "image",
          status  : "status",
          icon    : "icon",
          button  : "button",
          tag     : "tag",
        },
        t: {
          date    : 'date',
          amount  : 'amount',
          account : "account",
          text    : "text",
          note    : "note",
          checkbox: "checkbox",
          dropdown: "dropdown",
          number  : "number",
          input   : "input",
          badge   : "badge",
          image   : "image",
          status  : "status",
          icon    : "icon",
          button  : "button",
          tag     : "tag",
        }
      },
    },
    others : {
      n      : 'others',
      events : {
        n: 'events',
        p: {
          button : 'button',
          anchor : 'anchor',
          input  : 'input',
          select : 'select',
          element: 'element',
          row    : 'row',
        }
      },
      stepper: {
        n: 'stepper',
        p: {
          simple: 'simple',
        }
      }
    }
  },
  sup: {
    n       : 'support',
    standard: {
      b: {
        n: '',
        p: {}
      }
    }
  }
};

export default pb;