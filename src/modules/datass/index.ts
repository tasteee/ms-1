import * as React from 'react'

type Selector<T, U> = (state: T) => U
const defaultSelector = (state: any) => state

class Store<T> {
  subscribers: Set<() => void> = new Set()
  state: T

  constructor(initialState: T) {
    this.state = initialState
  }

  set(newState: T) {
    this.state = newState
    this.notifySubscribers()
  }

  getState(): T {
    return this.state
  }

  subscribe(callback: () => void) {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback())
  }

  use<U = T>(selector: Selector<T, U> = defaultSelector): U {
    const select = React.useMemo(() => selector, [])
    const [, forceUpdate] = React.useState({})
    const prevResultRef = React.useRef<U>(select(this.state))

    React.useEffect(() => {
      const unsubscribe = this.subscribe(() => {
        const newResult = select(this.state)
        if (!Object.is(newResult, prevResultRef.current)) {
          prevResultRef.current = newResult
          forceUpdate({})
        }
      })

      return unsubscribe
    }, [select])

    return select(this.state)
  }
}

class BooleanStore extends Store<boolean> {
  toggle() {
    this.set(!this.getState())
  }
}

class NumberStore extends Store<number> {
  increment() {
    this.set(this.getState() + 1)
  }

  decrement() {
    this.set(this.getState() - 1)
  }
}

class ArrayStore<T> extends Store<T[]> {
  useMap<U>(mapper: (item: T) => U): U[] {
    return this.use((state) => state.map(mapper))
  }

  useFilter(predicate: (item: T) => boolean): T[] {
    return this.use((state) => state.filter(predicate))
  }
}

const datass = {
  boolean: (initialState: boolean) => new BooleanStore(initialState),
  number: (initialState: number) => new NumberStore(initialState),
  string: (initialState: string) => new Store<string>(initialState),
  array: <T>(initialState: T[]) => new ArrayStore<T>(initialState),
  object: <T extends object>(initialState: T) => new Store<T>(initialState)
}

export { datass }
