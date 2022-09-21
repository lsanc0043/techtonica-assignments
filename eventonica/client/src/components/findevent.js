const FindEvent = () => {
  return (
    <aside className="search-toolbar">
      <div>
        <h3>Find Events</h3>
        <form id="search" action="#">
          <fieldset>
            <label htmlFor="date-search">Date</label>
            <input type="date" id="date-search" placeholder="YYYY-MM-DD" />
          </fieldset>
          <fieldset>
            <label htmlFor="category-search">Category</label>
            <input type="text" id="category-search" />
          </fieldset>
          <input type="submit" value="Search" />
        </form>
      </div>
    </aside>
  );
};

export default FindEvent;
