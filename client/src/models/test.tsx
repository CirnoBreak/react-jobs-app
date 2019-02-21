import { routerRedux, Router, RouteProps } from 'dva/router';

const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

export default {
  namespace: 'count',
  state: {
    count: {
      test: {
        gg: {
          ok: 0
        }
      }
    }
  },
  reducers: {
    add(state: any) { state.count.test.gg.ok += 1; },
    minus(state: any) { state.count.test.gg.ok -= 1; },
  },
  effects: {
    *addWithDelay(action: any, { call, put }: {call: any, put: any}) {
      yield call(delay, 500);
      yield put({ type: 'add' });
    },
    *redirect(action: any, { put }: {put: any}) {
      yield put(routerRedux.push('/abc'));
    },
  },
}