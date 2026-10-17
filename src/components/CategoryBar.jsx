const CATEGORIES = ['Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

function CategoryBar({ selected, onSelect }) {
  return (
    <div className="category-bar">
      <button
        type="button"
        className={selected === '' ? 'chip active' : 'chip'}
        onClick={function () {
          onSelect('');
        }}
      >
        All
      </button>
      {CATEGORIES.map(function (name) {
        return (
          <button
            key={name}
            type="button"
            className={selected === name ? 'chip active' : 'chip'}
            onClick={function () {
              onSelect(name);
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryBar;