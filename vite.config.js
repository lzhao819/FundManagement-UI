import vue from '@vitejs/plugin-vue'

module.exports = {
    publicPath: '/FundManagement-UI/'
  }

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    }
}