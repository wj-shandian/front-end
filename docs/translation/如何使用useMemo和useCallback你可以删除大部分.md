[原文](https://www.developerway.com/posts/how-to-use-memo-use-callback)

- [x] 翻译进行中 10%

# How to useMemo and useCallback: you can remove most of them

# 如何使用 useMemo 和 useCallback,你可以删除其中的大部分

What is the purpose of useMemo and useCallback hooks, mistakes and best practices in using them, and why removing most of them might be a good idea.  
<font color="red">useMemo 和 useCallback 的 hooks 的目的是什么，使用他们的错误和最佳实践是什么，并且为什么移除他们其中大部是一个好主意</font>

If you’re not completely new to React, you’re probably already at least familiar with useMemo and useCallback hooks.  
<font color="red">如果你对 react 不完全陌生，那么你可能至少已经熟悉 useMemo 和 useCallback 的 hooks。（probable:至少，already:已经，familiar：熟悉）</font>

And if you work on a medium to large-scale application, chances are you can describe some parts of your app as an “incomprehensible chain of useMemo and useCallbacks that is impossible to read and debug".  
<font color="red">如果你在一个中大型应用中使用，你有可能将应用程序的某部分描述为“一连串难以理解的 useMemo 和 useCallback”，无法阅读和调试（large-scale：大型，incomprehensible：无法理解，chain：串联）</font>

Those hooks somehow have the ability to just spread around the code uncontrollably, until they just completely take over and you find yourself writing them just because they are everywhere and everyone around you is writing them.  
<font color="red">这些 hooks 有能力不受控制的在代码周围四处传播（somehow：以某种方式，spread：展开，uncontrollably：不能控制的）,直到它完全占据你的思想并且你会发现你一直在写它，因为在你周围所有人都在写它（take over：占据）</font>

And do you know the sad part? All of this is completely unnecessary. You can probably remove 90% of all useMemo and useCallbacks in your app right now, and the app will be fine and might even become slightly faster.  
<font color="red">
你知道最可悲的是什么吗？所有的这些都是完全不需要的，你现在可以删除应用中 90%的 useMemo 和 useCallback，应用还可以正常运行，甚至可能会稍微快一点（unnecessary：完全不需要，slightly：稍微）
</font>
Don’t get me wrong, I’m not saying that useMemo or useCallback are useless. Just that their use is limited to a few very specific and concrete cases. And most of the time we’re wrapping things in them unnecessary.  
<font color="red">
不要误解我，我没有说 useMemo 或者 useCallback 是没有用的，只是说他们的使用只在一些特殊的或者具体场景使用，并且大多数情况下我们都完全不需要用它包装东西（useless：无用的，specific：特殊的，concrete：具体的，cases：案件）
</font>
So this is what I want to talk about today: what kind of mistakes developers make with useMemo and useCallback, what is their actual purpose, and how to use them properly.  
<font color="red">
因此今天我想讨论的是：开发者时使用 useMemo 和 useCallback 会犯那些错误，他们真正的用途是什么，以及我们应该怎样去使用他们
</font>

There are two major sources of the poisonous spread of those hooks in the app:  
<font color="red">
这两个 hooks 在应用程序中毒害传播是主要的两个来源：（major：专业，poisonous：有毒）
</font>

- memoizing props to prevent re-renders
- <font color="red">缓存 props 去阻止重新渲染</font>
- memoizing values to avoid expensive calculations on every re-render
- <font color="red">缓存 values，避免重新渲染去做昂贵的计算（avoid:避免，expensive：昂贵的 ，calculations：计算）</font>

We’ll take a look at them later in the article, but first: what exactly is the purpose of useMemo and useCallback?  
<font color="red">我们看下面文章的讨论：但是首选我们要知道 useMemo 和 useCallback 真是的目的是什么？</font>

## Why do we need useMemo and useCallback

The answer is simple - memoization between re-renders. If a value or a function is wrapped in one of those hooks, react will cache it during the initial render, and return the reference to that saved value during consecutive renders. Without it, non-primitive values like arrays, objects, or functions, will be re-created from scratch on every re-render. memoization is useful when those values are compared. It’s just your normal javascript:

```js
const a = { "test": 1 };
const b = { "test": 1'};

console.log(a === b); // will be false

const c = a; // "c" is just a reference to "a"

console.log(a === c); // will be true
```

Or, if closer to our typical React use case:

```js
const Component = () => {
  const a = { test: 1 };

  useEffect(() => {
    // "a" will be compared between re-renders
  }, [a]);

  // the rest of the code
};
```

a value is a dependency of useEffect hook. On every re-render of Component React will compare it with the previous value. a is an object defined within the Component, which means that on every re-render it will be re-created from scratch. Therefore a comparison of a “before re-render” with a “after re-render” will return false, and useEffect will be triggered on every re-render.

To avoid it, we can wrap the a value in useMemo hook:

```js
const Component = () => {
  // preserving "a" reference between re-renders
  const a = useMemo(() => ({ test: 1 }), []);

  useEffect(() => {
    // this will be triggered only when "a" value actually changes
  }, [a]);

  // the rest of the code
};
```

Now useEffect will be triggered only when the a value actually changes (i.e. never in this implementation).

Exactly the same story with useCallback, only it’s more useful for memoizing functions:

```js
const Component = () => {
  // preserving onClick function between re-renders
  const fetch = useCallback(() => {
    console.log("fetch some data here");
  }, []);

  useEffect(() => {
    // this will be triggered only when "fetch" value actually changes
    fetch();
  }, [fetch]);

  // the rest of the code
};
```

The most important thing to remember here is that both useMemo and useCallback are useful only during the re-renders phase. During the initial render, they are not only useless but even harmful: they make React do some additional work. This means that your app will become slightly slower during the initial render. And if your app has hundreds and hundreds of them everywhere, this slowing down can even be measurable.

## Memoizing props to prevent re-renders

Now that we know the purpose of those hooks, let's take a look at their practical usage. And one of the most important ones and the most often used is to memoize props values to prevent re-renders. Make some noise if you’ve seen the code below somewhere in your app:

1. Had to wrap onClick in useCallback to prevent re-renders

```js
const Component = () => {
  const onClick = useCallback(() => {
    /* do something */
  }, []);
  return (
    <>
      <button onClick={onClick}>Click me</button>
      ... // some other components
    </>
  );
};
```

2. Had to wrap onClick in useCallback to prevent re-renders

```js
const Item = ({ item, onClick, value }) => (
  <button onClick={onClick}>{item.name}</button>
);

const Component = ({ data }) => {
  const value = { a: someStateValue };

  const onClick = useCallback(() => {
    /* do something on click */
  }, []);

  return (
    <>
      {data.map((d) => (
        <Item item={d} onClick={onClick} value={value} />
      ))}
    </>
  );
};
```

3. Had to wrap value in useMemo, because it’s a dependency of a memoized onClick:

```js
const Item = ({ item, onClick }) => (
  <button onClick={onClick}>{item.name}</button>
);

const Component = ({ data }) => {
  const value = useMemo(() => ({ a: someStateValue }), [someStateValue]);
  const onClick = useCallback(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      {data.map((d) => (
        <Item item={d} onClick={onClick} />
      ))}
    </>
  );
};
```

Is this something that you’ve done or seen other people around you do? Do you agree with the use case and how the hook solved it? If the answer to those questions is “yes”, congratulations: useMemo and useCallback took you hostage and unnecessary control your life. In all of the examples, those hooks are useless, unnecessary complicate code, slow down initial render and prevent nothing.

To understand why, we need to remember one important thing about how React works: the reasons why a component can re-render itself.

## Why a component can re-render itself?

“Component re-renders itself when state or prop value changes” is common knowledge. Even React docs phrase it like this. And I think this statement is exactly what leads to the false conclusion that “if props don’t change (i.e. memoized), then it will prevent the component from re-render”.

Because there is another very important reason for a component to re-render: when its parent re-renders itself. Or, if we go from the opposite direction: when a component re-renders itself, it also re-renders all of its children. Take a look at this code for example:

```js
const App = () => {
  const [state, setState] = useState(1);

  return (
    <div className="App">
      <button onClick={() => setState(state + 1)}>
        {" "}
        click to re-render {state}
      </button>
      <br />
      <Page />
    </div>
  );
};
```

App component has some state and some children, including Page component. What will happen when a button is clicked here? State will change, it will trigger App's re-render, and that will trigger re-render of all of its children, including Page component. It doesn’t even have props!

Now, inside of this Page component, if we have some children as well:

```js
const Page = () => <Item />;
```

Completely empty, it doesn’t have neither state nor props. But its re-render will be triggered when App re-renders, and as a result, it will trigger the re-render of its Item child. App component state change triggers a chain of re-renders across the entire app. See the full example in this codesandbox.

The only way to interrupt this chain is to memoize some of the components in it. We can do it either with useMemo hook, or, even better, with React.memo util. Only if the component is wrapped with it will React stop before re-rendering it and check, whether the props value changes.

Memoizing the component:

```js
const Page = () => <Item />;
const PageMemoized = React.memo(Page);
```

Using it in App with state change:

```js
const App = () => {
  const [state, setState] = useState(1);

  return (
    ... // same code as before
      <PageMemoized />
  );
};
```

In this, and only this scenario it’s important whether props are memoized or not.

To illustrate, let's assume that Page component has onClick prop that accepts a function. What will happen if I pass it to Page without memoizing it first?

```js
const App = () => {
  const [state, setState] = useState(1);
  const onClick = () => {
    console.log("Do something on click");
  };
  return (
    // page will re-render regardless of whether onClick is memoized or not
    <Page onClick={onClick} />
  );
};
```

App will re-render, React will find Page in its children, and will re-render it. Whether onClick is wrapped in useCallback or not is irrelevant.

And if I memoize Page?

```js
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = () => {
    console.log("Do something on click");
  };
  return (
    // PageMemoized WILL re-render because onClick is not memoized
    <PageMemoized onClick={onClick} />
  );
};
```

App will re-render, React will find PageMemoized in its children, realise that it’s wrapped in React.memo, stop the chain of re-renders, and check first whether props on this component change. In this case, since onClick is a not memoized function, the result of props comparison will fail, and PageMemoized will re-render itself. Finally, some use for useCallback:

```js
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = useCallback(() => {
    console.log("Do something on click");
  }, []);

  return (
    // PageMemoized will NOT re-render because onClick is memoized
    <PageMemoized onClick={onClick} />
  );
};
```

Now, when React stops on PageMemoized to check its props, onClick will stay the same, and PageMemoized will not be re-rendered.

What will happen if I add another non-memoized value to PageMemoized? Exactly the same scenario:

```js
const PageMemoized = React.memo(Page);

const App = () => {
  const [state, setState] = useState(1);
  const onClick = useCallback(() => {
    console.log("Do something on click");
  }, []);

  return (
    // page WILL re-render because value is not memoized
    <PageMemoized onClick={onClick} value={[1, 2, 3]} />
  );
};
```

React stops on PageMemoized to check its props, onClick will stay the same, but value will change, and PageMemoized will re-render itself. See the full example here, try to remove memoization to see how everything starts re-rendering again.

Considering the above, there is only one scenario, when memoizing props on a component makes sense: when every single prop and the component itself are memoized. Everything else is just a waste of memory and unnecessarily complicates your code.

Feel free to remove all useMemo and useCallbacks from the code if:

- they passed as attributes, directly or through a chain of dependencies, to DOM elements
- they passed as props, directly or through a chain of dependencies, to a component that is not memoized
- they passed as props, directly or through a chain of dependencies, to a component with at least one prop not memoized

Why remove, not just fix memoization? Well, if you had performance problems because of re-renders in that area, you would’ve noticed and fixed it already, isn’t it? 😉 And since there is no performance problem, there is no need to fix it. Removing useless useMemo and useCallback will simplify the code and speed up initial render a bit, without negatively impacting existing re-renders performance.

## Avoiding expensive calculations on every render

The primary goal of useMemo, according to React docs, is to avoid expensive calculations on every render. No hints though of what constitutes the “expensive” calculation. As a result, developers sometimes wrap in useMemo pretty much every calculation in the render function. Create a new date? Filter, map or sort an array? Create an object? useMemo for all!

Okay, let’s take a look at some numbers. Imagine we have an array of countries (~250 of them), and we want to render them on the screen and allow users to sort them.

```js
const List = ({ countries }) => {
  // sorting list of countries here
  const sortedCountries = orderBy(countries, "name", sort);

  return (
    <>
      {sortedCountries.map((country) => (
        <Item country={country} key={country.id} />
      ))}
    </>
  );
};
```

The question is: is sorting an array of 250 elements an expensive operation? Feels like it, isn’t it? We probably should wrap it in useMemo to avoid re-calculating it on every re-render, right? Well, easy to measure:

```js
const List = ({ countries }) => {
  const before = performance.now();

  const sortedCountries = orderBy(countries, 'name', sort);

  // this is the number we're after
  const after = performance.now() - before;

  return (
    // same
  )
};
```

The end result? Without memoization, with 6x CPU slowdown, sorting of this array with ~250 items takes less than 2 milliseconds. To compare, rendering this list - just native buttons with text - takes more than 20 milliseconds. 10 times more! See the codesandbox.

And in real life, the array likely will be much smaller, and whatever is rendered much more complicated, and therefore slower. So the difference in performance will be even bigger than 10 times.

Instead of memoizing the array operation, we should memoize the actual most expensive calculation here - re-rendering and updating components. Something like this:

```js
const List = ({ countries }) => {
  const content = useMemo(() => {
    const sortedCountries = orderBy(countries, "name", sort);

    return sortedCountries.map((country) => (
      <Item country={country} key={country.id} />
    ));
  }, [countries, sort]);

  return content;
};
```

That useMemo drops unnecessary re-renders time of the entire component from ~20ms to less than 2ms.

Considering the above, this is the rule about memoizing “expensive” operations that I want to introduce: unless you actually calculating factorials of big numbers, remove useMemo hook on all pure javascript operations. Re-rendering children will always be your bottleneck. Use useMemo only to memoize heavy parts of the render tree.

Why remove though? Wouldn’t it be better to just memoize everything? Wouldn’t it be a compound effect that degrades performance if we just remove them all? One millisecond here, 2 there, and soon our app is not as fast as it could be…

Fair point. And that thinking would be 100% valid, if it wasn’t for one caveat: memoization doesn’t come for free. If we’re using useMemo, during the initial render React needs to cache the result value - that takes time. Yes, it will be tiny, in our app above memoizing those sorted countries takes less than a millisecond. But! This will be the true compound effect. The initial render happens when your app first appears on the screen. Every component that is supposed to show up goes through it. In a big app with hundreds of components, even if a third of those memoize something, that could result in 10, 20, at worst maybe even 100 milliseconds added to the initial render.

Re-render, on the other hand, only happens after something in one part of the app changes. And in a well-architectured app only this particular small part going to be re-rendered, not the entire app. How many of the “calculations” similar to the case above we’ll have in that changed part? 2-3? Let’s say 5. Each memoization will save us less than 2 milliseconds, i.e. overall less than 10 milliseconds. 10 milliseconds that may or may not happen (depends on whether the event that triggers it happens), that are not visible with the naked eye, and that will be lost in children’s re-renders that will take 10 times that much anyway. At the cost of slowing down the initial render that will always happen 😔.

## Enough for today

That was quite a lot of information to process, hope you found it useful and are now eager to review your apps and get rid of all the useless useMemo and useCallback that accidentally took over your code. Quick summary to solidify the knowledge before you go:

- useCallback and useMemo are hooks that are useful only for consecutive renders (i.e. re-renders), for the initial render they are actually harmful
- useCallback and useMemo for props don’t prevent re-renders by themselves. Only when every single prop and the component itself are memoized, then re-renders can be prevented. One single mistake and it all falls apart and makes those hooks useless. Remove them if you find them.
- Remove useMemo around “native” javascript operations - compare to components updates those are invisible and just take additional memory and valuable time during the initial render

One small thing: considering how complicated and fragile all of this is, useMemo and useCallback for performance optimisations really should be your last resort. Try other performance optimisation techniques first. Take a look at those articles that describe some of those:

-
-
-
-

And of course, goes without saying: measure first!

May this day be your last day in useMemo and useCallback hell! ✌🏼
