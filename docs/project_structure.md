quizverse/
|
├── docs/                           # Project documentation
|
|
├── backend/                        # Backend code (future)
|
|
└── client/                         # Platform-specific code
    ├── web/                        # Web-specific implementations
    │   ├── assets/                 # Static assets (images, fonts, etc.)
    │   ├── components/            
    │   │   ├── common/             # Shared components
    │   │   ├── features/           # Feature-specific components
    │   │   └── layouts/            # Layout components
    │   ├── composables/            # Reusable Vue composition functions
    │   ├── config/                 # App configuration
    │   ├── core/                   # Core business logic
    │   │   ├── domain/             # Domain models and interfaces
    │   │   ├── services/           # Business logic services
    │   │   └── repositories/       # Data access layer
    │   ├── infrastructure/         # External services integration
    │   │   ├── api/                # API clients
    │   │   ├── storage/            # Storage services
    │   │   └── analytics/          # Analytics integration
    │   ├── locales/                # i18n translations
    │   ├── navigation/             # Router and navigation logic
    │   ├── pages/                  # Vue components for routes
    │   ├── store/                  # Pinia stores
    │   │   ├── modules/            # Store modules
    │   │   └── index.ts            # Store configuration
    │   ├── styles/                 # Global styles
    │   │   ├── base/               # Base styles
    │   │   ├── components/         # Component styles
    │   │   └── variables/          # Style variables
    │   ├── types/                  # TypeScript type definitions
    │   |── utils/                  # Utility functions
    |   |
    |   ├── tests/                  # Test files
    |   │   ├── unit/               # Unit tests
    |   │   ├── integration/        # Integration tests
    |   │   └── e2e/                # End-to-end tests
    └── mobile/                     # Mobile-specific implementations (future)