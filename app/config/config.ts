const config = {
    BACKEND_ENDPOINT: process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : ''
}

export default config;