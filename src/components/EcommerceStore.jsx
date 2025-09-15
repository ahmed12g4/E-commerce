import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Star,
  Heart,
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  Zap,
  Award,
  Users,
  Package,
  Eye,
  Filter,
  Grid,
  List,
  ChevronDown,
  Lock,
  Sun,
  Moon,
} from "lucide-react";

const ECommerceStore = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(true);

  const observerRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all animated elements
    document.querySelectorAll("[data-animate]").forEach((el) => {
      if (observerRef.current && el.id) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      brand: "AudioTech Pro",
      price: 299,
      originalPrice: 399,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 2847,
      category: "Electronics",
      isNew: true,
      features: ["Noise Cancellation", "40h Battery", "Bluetooth 5.0"],
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      brand: "FitTrack Elite",
      price: 249,
      originalPrice: 329,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      rating: 4.6,
      reviews: 1923,
      category: "Electronics",
      isHot: true,
      features: ["Heart Rate Monitor", "GPS", "7-day Battery"],
    },
    {
      id: 3,
      name: "Designer Leather Jacket",
      brand: "Urban Style Co",
      price: 189,
      originalPrice: 259,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      rating: 4.7,
      reviews: 856,
      category: "Fashion",
      features: ["Genuine Leather", "Water Resistant", "Premium Lining"],
    },
    {
      id: 4,
      name: "Organic Skincare Set",
      brand: "Pure Beauty",
      price: 79,
      originalPrice: 119,
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
      rating: 4.9,
      reviews: 3421,
      category: "Beauty",
      isNew: true,
      features: ["100% Organic", "Dermatologist Tested", "Cruelty Free"],
    },
    {
      id: 5,
      name: "Professional Camera Lens",
      brand: "OpticPro",
      price: 549,
      originalPrice: 699,
      image:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 756,
      category: "Electronics",
      features: ["85mm f/1.4", "Weather Sealed", "Image Stabilization"],
    },
    {
      id: 6,
      name: "Minimalist Office Chair",
      brand: "ErgoDesign",
      price: 329,
      originalPrice: 429,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      rating: 4.5,
      reviews: 1234,
      category: "Home",
      features: ["Ergonomic Design", "Adjustable Height", "Premium Materials"],
    },
  ];

  const categories = ["All", "Electronics", "Fashion", "Beauty", "Home"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $100",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Same day delivery available",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Premium quality products",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round the clock customer support",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "Up to 100 products",
        "Basic analytics",
        "Email support",
        "Mobile responsive",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "79",
      period: "/month",
      description: "Best for growing businesses",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "Custom domain",
        "SEO tools",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "199",
      period: "/month",
      description: "For large scale operations",
      features: [
        "Everything in Pro",
        "Dedicated manager",
        "Custom integrations",
        "White-label solution",
        "API access",
      ],
      popular: false,
    },
  ];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-500 ${
        isDarkMode ? "bg-gray-50" : "bg-slate-50"
      }`}
    >
      {/* Custom Scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #f97316, #ea580c);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #ea580c, #dc2626);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-500 ${
          isDarkMode
            ? "bg-slate-900/95 border-slate-800/50"
            : "bg-white/95 border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div
                className="relative transform transition-all duration-500 hover:scale-110"
                style={{
                  transform: `translateY(${scrollY * 0.05}px) rotate(${
                    scrollY * 0.1
                  }deg)`,
                }}
              >
                <Package className="w-8 h-8 text-orange-500" />
                <div className="absolute inset-0 w-8 h-8 bg-orange-500/20 rounded-full blur-lg animate-pulse"></div>
              </div>
              <span
                className={`text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent`}
              >
                amazon multi-channel fulfillment
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "Explainer", "Compare"].map(
                (item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`transition-all duration-300 relative group ${
                      isDarkMode
                        ? "text-slate-300 hover:text-orange-400"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                )
              )}
              <div
                className={`flex items-center space-x-2 ${
                  isDarkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                <span className="text-blue-400 font-semibold">Webflow</span>
                <span className="text-slate-500">•</span>
                <span className="text-purple-400 font-semibold">
                  WooCommerce
                </span>
              </div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative p-2 text-slate-300 hover:text-orange-400 transition-all duration-300 hover:scale-110 group"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <div className="relative w-6 h-6">
                  <Sun
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isDarkMode
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <Moon
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                      isDarkMode
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                  />
                </div>
                <div className="absolute inset-0 w-6 h-6 bg-orange-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 transition-all duration-300 hover:scale-110 ${
                  isDarkMode
                    ? "text-slate-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs text-white flex items-center justify-center animate-bounce">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 transition-colors duration-300 ${
                  isDarkMode
                    ? "text-slate-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden backdrop-blur-lg border-t ${
            isDarkMode
              ? "bg-slate-900/98 border-slate-800/50"
              : "bg-white/98 border-gray-200/50"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {["Features", "Pricing", "Explainer", "Compare"].map(
              (item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 transition-colors duration-300 ${
                    isDarkMode
                      ? "text-slate-300 hover:text-orange-400"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animation: isMenuOpen
                      ? `slideInRight 0.3s ease-out ${index * 100}ms both`
                      : "none",
                  }}
                >
                  {item}
                </a>
              )
            )}
            <button
              onClick={() => {
                setIsLoginOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 w-full justify-center"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900"
            : "bg-gradient-to-br from-blue-50 via-white to-orange-50"
        }`}
      >
        {/* Animated Background */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900"
              : "bg-gradient-to-br from-blue-100 via-white to-orange-100"
          }`}
        >
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-[radial-gradient(circle_at_30%_40%,rgba(249,115,22,0.1),transparent_50%)]"
                : "bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]"
            }`}
          ></div>
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1),transparent_50%)]"
                : "bg-[radial-gradient(circle_at_70%_60%,rgba(249,115,22,0.1),transparent_50%)]"
            }`}
          ></div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <p className="text-slate-400 text-lg font-medium tracking-wide animate-fade-in-delay">
              Amazon Multi-Channel Fulfillment for Webflow and WooCommerce
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight animate-slide-up">
              Harness the power of the
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Amazon fulfillment network
              </span>
            </h1>

            <p
              className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay"
              style={{ animationDelay: "0.8s" }}
            >
              Accelerate your growth by connecting your Webflow Ecommerce or
              WooCommerce store to the world's leading fulfillment network.
              Enjoy fast, reliable 3-day standard delivery and white-label
              packaging with a seamless, end-to-end fulfillment solution.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delay"
              style={{ animationDelay: "1.2s" }}
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center space-x-2">
                <span>Fulfill at scale</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="px-8 py-4 border-2 border-orange-400 text-orange-400 font-semibold rounded-xl hover:bg-orange-400 hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                How it works
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ${
            isDarkMode ? "border-orange-400" : "border-blue-500"
          }`}
        >
          <div
            className={`w-6 h-10 border-2 rounded-full flex justify-center ${
              isDarkMode ? "border-orange-400" : "border-blue-500"
            }`}
          >
            <div
              className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
                isDarkMode ? "bg-orange-400" : "bg-blue-500"
              }`}
            ></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 relative overflow-hidden transition-all duration-500 ${
          isDarkMode ? "bg-white" : "bg-gray-50"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-50 to-orange-50/30"
              : "bg-gradient-to-br from-blue-50 to-gray-50"
          }`}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="features-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleElements.has("features-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
                isDarkMode ? "text-slate-900" : "text-gray-900"
              }`}
            >
              Why Choose Our Platform
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
                isDarkMode ? "text-slate-600" : "text-gray-600"
              }`}
            >
              Experience the power of Amazon's fulfillment network with our
              seamless integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className={`group p-8 backdrop-blur-sm rounded-2xl border transition-all duration-500 transform hover:-translate-y-2 ${
                  isDarkMode
                    ? "bg-white/80 border-slate-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100"
                    : "bg-white/90 border-gray-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100"
                } ${
                  visibleElements.has(`feature-${index}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    isDarkMode
                      ? "text-slate-900 group-hover:text-orange-600"
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`leading-relaxed transition-colors duration-300 ${
                    isDarkMode ? "text-slate-600" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className={`py-20 relative transition-all duration-500 ${
          isDarkMode ? "bg-slate-50" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="products-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleElements.has("products-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
                isDarkMode ? "text-slate-900" : "text-gray-900"
              }`}
            >
              Featured Products
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
                isDarkMode ? "text-slate-600" : "text-gray-600"
              }`}
            >
              Discover our handpicked selection of premium products
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? isDarkMode
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : isDarkMode
                      ? "bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 border border-slate-200"
                      : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`flex rounded-lg border overflow-hidden transition-colors duration-500 ${
                  isDarkMode
                    ? "bg-white border-slate-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === "grid"
                      ? isDarkMode
                        ? "bg-orange-500 text-white"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                      ? "text-slate-600 hover:bg-slate-50"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === "list"
                      ? isDarkMode
                        ? "bg-orange-500 text-white"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                      ? "text-slate-600 hover:bg-slate-50"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                data-animate
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100 ${
                  visibleElements.has(`product-${product.id}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${viewMode === "list" ? "flex" : ""}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`relative ${
                    viewMode === "list" ? "w-64 flex-shrink-0" : ""
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === "list" ? "h-full" : "h-64"
                    }`}
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      New
                    </span>
                  )}
                  {product.isHot && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Hot
                    </span>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                      {product.brand}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-slate-700">
                        {product.rating}
                      </span>
                      <span className="text-sm text-slate-500">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-slate-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-orange-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="pricing-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleElements.has("pricing-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                id={`pricing-${index}`}
                data-animate
                className={`relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 transition-all duration-500 transform hover:-translate-y-2 ${
                  plan.popular
                    ? "border-orange-400 shadow-xl shadow-orange-100 scale-105"
                    : "border-slate-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100"
                } ${
                  visibleElements.has(`pricing-${index}`)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <div className="flex items-center justify-center">
                    <span className="text-5xl font-bold text-slate-900">
                      ${plan.price}
                    </span>
                    <span className="text-slate-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/25"
                      : "bg-slate-100 text-slate-900 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(249,115,22,0.2),transparent_50%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            id="newsletter-content"
            data-animate
            className={`transition-all duration-1000 ${
              visibleElements.has("newsletter-content")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates, exclusive offers, and insider tips
              delivered straight to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all duration-300"
                />
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Package className="w-8 h-8 text-orange-500" />
                <span className="text-xl font-bold">
                  Amazon Multi-Channel Fulfillment
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                Connect your Webflow or WooCommerce store to Amazon's
                world-class fulfillment network for fast, reliable delivery and
                exceptional customer experience.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Social, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <Social className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Documentation", "Support", "API"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>{link}</span>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <span className="text-slate-400">support@amazon-mcf.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="text-slate-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span className="text-slate-400">Seattle, WA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; 2025 | All rights reserved. Made by{" "}
              <a
                href="https://ahmed12g4.github.io/Portfolio1/"
                target="_blank"
                rel="noreferrer"
              >
                <strong className="text-orange-400">Ahmed Seleem</strong>
              </a>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 scale-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300"
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="w-full max-w-md bg-white shadow-2xl transform transition-all duration-300 translate-x-0">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Shopping Cart
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-slate-600 mt-1">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex space-x-4 p-4 bg-slate-50 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-sm">
                            {item.name}
                          </h3>
                          <p className="text-slate-600 text-sm">{item.brand}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-orange-600">
                              ${item.price}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-slate-600">
                                Qty: {item.quantity}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-slate-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      ${getTotalPrice()}
                    </span>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Checkout</span>
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-2">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-stay {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in-stay 1.2s ease-out forwards;
          opacity: 1 !important;
        }

        .animate-fade-in-delay {
          animation: fade-in-stay 1.5s ease-out forwards;
          opacity: 1 !important;
        }

        .animate-slide-up {
          animation: slide-up 1.2s ease-out forwards;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default ECommerceStore;
