import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate";
import YTPreview from "./pages/YTPreview";
import MyGeneration from "./pages/MyGeneration";
import Login from "./components/Login";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast"
import NotFound from "./pages/NotFound";

/**
 * App - Root component that defines the application layout and routing.
 * Renders global elements (Toaster, LenisScroll, Navbar, Footer) and
 * sets up client-side routes for all pages. Scrolls to top on route change.
 */
export default function App() {

    // Track current pathname to trigger scroll-to-top on navigation
    const {pathname} = useLocation();

    // Scroll to top whenever the route changes
    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [pathname])

    return (
        <>
            {/* Toast notification container */}
            <Toaster />
            {/* Smooth scroll behavior via Lenis */}
            <LenisScroll />
            {/* Persistent top navigation bar */}
            <Navbar />
            {/* Application route definitions */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/generate/:id" element={<Generate />} />
                <Route path="/my-generation" element={<MyGeneration />} />
                <Route path="/preview" element={<YTPreview />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>


            {/* Persistent footer */}
            <Footer />
        </>
    );
}