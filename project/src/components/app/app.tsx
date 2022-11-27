import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getDataLoadingStatus, getErrorStatus } from '../../store/offer-data/selectors';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Spinner from '../spinner/spinner';
import LoadError from '../load-error/load-error';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (hasError) {
    return (
      <LoadError />);
  }

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main />} />
            <Route path={`${AppRoute.Offer}/:id`} element={<Property />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
