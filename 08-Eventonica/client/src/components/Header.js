import calendar from "../calendar.png"; // import local calendar png file

const Header = () => {
  return (
    <header>
      <img src={calendar} alt="Calendar Star Logo" />
      <h1>Eventonica</h1>
    </header>
  );
};

export default Header;
