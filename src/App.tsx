import React, { Fragment, useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Loader from './components/Loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './contexts/AdoptedPetContext';
import { Pet } from './types/common';

const Details = lazy(() => import('./pages/Details'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/404'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState<Pet | null>(null);

  return (
    <Fragment>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="loader-container">
                  <Loader />
                </div>
              }
            >
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </Fragment>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLDivElement
);
root.render(<App />);
