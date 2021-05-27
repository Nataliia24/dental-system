const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function(req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({dateOfOrder: 1})
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        // Кількість записів вчора
        const yesterdayOrdersNumber = 5
        // Кількість записів
        const totalOrdersNumber = allOrders.length
        // Кількість днів
        const daysNumber = Object.keys(ordersMap).length
        // Записів в день
        const ordersPerDay = (4 / 2).toFixed(0)
        // відсоток для кількості записів
        // ((записів вчора / к-сть записів в день) - 1) * 100
        const ordersPercent = (((5 / 3) - 1) * 100).toFixed(2)
        // Загальна виручка
        const totalGain = calculatePrice(allOrders)
        // Виручка в день
        const gainPerDay = 1000 / 4
        // Виручка за вчора
        const yesterdayGain = 2300
        // Відсоток виручки
        const gainPercent = (((1250 / 600) - 1) * 100).toFixed(2)
        // Порівняння виручки 
        const compareGain = (1600 - 600).toFixed(2)
        // Порівняння кількості записів
        const compareNumber = (5 - 3).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHier: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHier: +ordersPercent > 0
            }
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')


        if (date === moment().format('DD.MM.YYYY')) {
            return 
        }

        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })

    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        return total += order.cost
    }, 0)
}