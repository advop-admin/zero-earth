const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    icon = null,
    iconPosition = 'right',
    onClick = () => {},
    type = 'button',
    ...props
  }) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 hover:scale-105 hover:shadow-xl hover:shadow-green-600/25 disabled:bg-green-600/50',
      secondary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25 disabled:bg-blue-600/50',
      outline: 'border border-white/30 hover:border-white/60 text-white hover:bg-white/10 focus:ring-white/50 backdrop-blur-sm disabled:border-white/20 disabled:text-white/50',
      ghost: 'text-white hover:bg-white/10 focus:ring-white/50 disabled:text-white/50',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 hover:scale-105 hover:shadow-xl hover:shadow-red-600/25 disabled:bg-red-600/50'
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm space-x-1',
      md: 'px-6 py-3 text-base space-x-2',
      lg: 'px-8 py-4 text-lg space-x-2',
      xl: 'px-10 py-5 text-xl space-x-3'
    };
  
    const LoadingSpinner = () => (
      <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  
    const renderIcon = () => {
      if (loading) return <LoadingSpinner />;
      if (!icon) return null;
      
      if (typeof icon === 'string') {
        // If icon is a string, assume it's an icon name or path
        return <span className="text-current">{icon}</span>;
      }
      
      return icon;
    };
  
    return (
      <button
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && iconPosition === 'left' && renderIcon()}
        
        <span className={loading ? 'opacity-70' : ''}>
          {loading ? 'Loading...' : children}
        </span>
        
        {!loading && iconPosition === 'right' && renderIcon()}
      </button>
    );
  };
  
  export default Button;