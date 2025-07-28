const Loading = ({ 
    size = 'md', 
    color = 'green', 
    text = 'Loading...', 
    showText = true 
  }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8', 
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
  
    const colorClasses = {
      green: 'border-green-400',
      blue: 'border-blue-400',
      purple: 'border-purple-400',
      white: 'border-white'
    };
  
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative">
          <div 
            className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-opacity-20 rounded-full animate-spin`}
          >
            <div 
              className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} border-2 border-transparent border-t-current rounded-full animate-spin`}
            ></div>
          </div>
          
          {/* Pulse effect */}
          <div 
            className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} border border-opacity-10 rounded-full animate-ping`}
          ></div>
        </div>
        
        {showText && (
          <p className={`text-${color}-400 text-sm font-medium animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    );
  };
  
  export default Loading;