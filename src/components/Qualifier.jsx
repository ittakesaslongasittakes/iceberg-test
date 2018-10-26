/**
 * Returns a main Cycle.js component (a function from sources to sinks)
 * @sources Object - will use only a few of the properties of this object:
 * {
 *     @DOM Stream - responsible for drawing the elements of the pages
 *                   and listening to events on them
 *
 *     @onion Stream - responsible for the state of the application
 * }
 * @pages String - responsible for drawing the stack of components
 */
export const Qualifier = ({ DOM, onion }, page) => {
  //
  const $ = onion.state$;
  //
  return {
    DOM: $.map(s => {
      return (
        <svg className="wrap --screen --black">
          <polyline
            points={s.path.reduce((acc, val) => {
              return `${acc} ${val.x},${val.y}`;
            }, "")}
            stroke="red"
            strokeWidth="3"
          />
        </svg>
      );
    }),
    onion: DOM.select(".wrap")
      .events("mousemove")
      .map(_ => s => ({
        ...s,
        path: s.path.concat({ x: _.offsetX, y: _.offsetY })
      }))
  };
};
