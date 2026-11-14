import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

const OurSystems = lazy(() => import('@/pages/OurSystems'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const OurGardens = lazy(() => import('@/pages/OurGardens'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageFallback() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center" role="status" aria-live="polite">
      <Loader2 className="h-6 w-6 animate-spin text-forest-700" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="our-systems"
          element={
            <Suspense fallback={<PageFallback />}>
              <OurSystems />
            </Suspense>
          }
        />
        <Route
          path="how-it-works"
          element={
            <Suspense fallback={<PageFallback />}>
              <HowItWorks />
            </Suspense>
          }
        />
        <Route
          path="our-gardens"
          element={
            <Suspense fallback={<PageFallback />}>
              <OurGardens />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
