import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo';
import ListCities from '../../components/list-cities/list-cities';
import ListOffers from '../../components/list-offers/list-offers';
import Map from '../../components/map/map';
import MainEmpty from '../main-empty/main-empty';
import { BlockPlaces, Leaflet } from '../../const';

function Main(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);

  const cityOffers = allOffers.filter((offer) => offer.city.name === currentCity.name);
  const numberOffers = cityOffers.length;
  const isOffers = (numberOffers > 0);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities simple: Main</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#dummy">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index${!isOffers ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ListCities currentCity={currentCity} />
          </section>
        </div>
        <div className="cities">
          {isOffers ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{numberOffers} places to stay in {currentCity.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>{' '}
                  <span className="places__sorting-type" tabIndex={0}>Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <ListOffers block={BlockPlaces.Cities} offers={cityOffers} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map heightMap={Leaflet.HeightMap.Main} city={currentCity} offers={cityOffers} />
                </section>
              </div>
            </div>
          ) : <MainEmpty city={currentCity} />}
        </div>
      </main>
    </div>
  );
}

export default Main;
