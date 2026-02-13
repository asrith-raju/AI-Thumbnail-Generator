import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-pink-500 px-4">

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 text-center max-w-md w-full"
            >
                {/* 404 Text */}
                <motion.h1
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-7xl font-extrabold text-white mb-4"
                >
                    404
                </motion.h1>

                <h2 className="text-2xl font-semibold text-white mb-2">
                    Page Not Found
                </h2>

                <p className="text-white/80 mb-6">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;