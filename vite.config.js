import path from 'path'

export default {
    root: path.resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: './src/index.html',
                applicant: './src/applicant.html',
                submit: "./src/submit.html",
                confirm: "./src/confirm.html",
                contact: "./src/contact.html",
                prevschool: "./src/prevschool.html"
            },
        },
    },
    server: {
        port: 8080
    }
}
