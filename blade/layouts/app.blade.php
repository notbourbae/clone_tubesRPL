<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Gorden Yulie Batu - Website Resmi')</title>
    
    <!-- AlpineJS for Interactive components (e.g., Sidebar, Mobile Navbar, Modals) -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <!-- Tailwind CSS v4 CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;850&family=Playfair+Display:ital,wght@0,500;0,700;1,400;1,750&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --font-sans: 'Plus Jakarta Sans', sans-serif;
            --font-serif: 'Playfair Display', Georgia, serif;
        }
        
        body {
            font-family: var(--font-sans);
            background-color: #ffffff;
            color: #1f2937;
            -webkit-font-smoothing: antialiased;
        }
        
        .font-serif {
            font-family: var(--font-serif);
        }
        
        /* Custom scrollbars */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #c3a05c;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #b08d4a;
        }
    </style>
</head>
<body class="flex flex-col min-h-screen">

    <!-- Sticky Navigation Component -->
    @include('components.navbar')

    <!-- Main Content Area -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Dark Footer Component -->
    @include('components.footer')

</body>
</html>
