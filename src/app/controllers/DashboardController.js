const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const DatabaseInfo = require('../models/Staffs')
const DatabaseInfo2 = require('../models/Customers')
const Notes = require('../models/Notes')
const Products = require('../models/Products')
const Orders = require('../models/Orders')

class DashboardController
{
    // [GET] /dashboard/employees
    // Overview
    employees_overview(req, res, next)
    {
        Promise.all([
            Orders.find({}),
            Notes.find({})
        ])
            .then(([orders, notes]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/overview', {
                    styles: ['/css/overview.css'],
                    orders: multipleMongooseToObject(orders),
                    notes: multipleMongooseToObject(notes),
                    csw_name,
                    csw_position
                })
            })
            .catch(next);        
    }

    // Dashboard
    employees_dashboard(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/dashboard', {
                    styles: ['/css/dashboard.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Orders
    employees_orders(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/orders', {
                    styles: ['/css/orders.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    employees_ordersdelivered(req, res, next)
    {
        Orders.findByIdAndUpdate(req.params.id, { delivered: true })
            .then(orders => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/orders', {
                    styles: ['/css/orders.css'],
                    orders: mongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Notes
    employees_notes(req, res, next)
    {
        Promise.all([Notes.find({}), Orders.find({})])
            .then(([notes, orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/notes', {
                    styles: ['/css/notes.css'],
                    notes: multipleMongooseToObject(notes),
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Products
    employees_products(req, res, next)
    {
        Promise.all([Products.find({}), Orders.find({})])
            .then(([products, orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/products', {
                    styles: ['/css/products.css'],
                    products: multipleMongooseToObject(products),
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Settings
    employees_settings(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/employees/settings', {
                    styles: ['/css/settings.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // [GET] /dashboard/manager
    // Overview
    managers_overview(req, res, next)
    {
        Promise.all([
            Orders.find({}),
            Notes.find({})
        ])
            .then(([orders, notes]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/overview', {
                    styles: ['/css/overview.css'],
                    orders: multipleMongooseToObject(orders),
                    notes: multipleMongooseToObject(notes),
                    csw_name,
                    csw_position
                })
            })
            .catch(next);
    }

    // Dashboard
    managers_dashboard(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/dashboard', {
                    styles: ['/css/dashboard.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    managers_orders(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/orders', {
                    styles: ['/css/orders.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    managers_ordersdeclined(req, res, next)
    {
        Orders.findByIdAndUpdate(req.params.id, { delivered: true, declined: true })
            .then(orders => res.render('dashboard/managers/orders', {
                styles: ['/css/orders.css'],
                orders: mongooseToObject(orders)
            }))
            .catch(next)
    }

    // Staffs
    managers_staffs(req, res, next)
    {
        Promise.all([DatabaseInfo.find({}), Orders.find({})])
            .then(([csw_info, orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/staffs', {
                    styles: ['/css/staffs.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_info: multipleMongooseToObject(csw_info),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Customers
    managers_customers(req, res, next)
    {
        Promise.all([DatabaseInfo2.find({}), Orders.find({})])
            .then(([csw_info2, orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/customers', {
                    styles: ['/css/customers.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_info2: multipleMongooseToObject(csw_info2),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // To-do List
    managers_notes(req, res, next)
    {
        Promise.all([Notes.find({}), Orders.find({})])
            .then(([notes, orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/notes', {
                    styles: ['/css/notes.css'],
                    orders: multipleMongooseToObject(orders),
                    notes: multipleMongooseToObject(notes),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Products
    managers_products(req, res, next)
    {
        Promise.all([Products.find({}), Orders.find({})])
            .then(([products, orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/products', {
                    styles: ['/css/products.css'],
                    orders: multipleMongooseToObject(orders),
                    products: multipleMongooseToObject(products),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Settings
    managers_settings(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.csw_name;
                const csw_position = req.session.csw_position;

                res.render('dashboard/managers/settings', {
                    styles: ['/css/settings.css'],
                    orders: multipleMongooseToObject(orders),
                    csw_name,
                    csw_position
                })
            })
            .catch(next)
    }

    // Delete
    managers_deletestaffs(req, res, next)
    {
        DatabaseInfo.delete({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    managers_deletecustomers(req, res, next)
    {
        DatabaseInfo2.delete({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    managers_deleteproducts(req, res, next)
    {
        Products.delete({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    managers_deletenotes(req, res, next)
    {
        Notes.delete({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] handle-form-actions
    handleFormActions(req, res, next)
    {
        switch(req.body.action)
        {
            case 'delete':
                DatabaseInfo.deleteOne({_id: { $in: req.body.memberID }})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Action is invalid.'})
        }
    }

    managers_store(req, res, next)
    {
        const formData = req.body      
        const newInfo = new DatabaseInfo(formData)
        newInfo.save()
            .then(() => res.redirect('/managers/staffs'))
            .catch(next)
    }

    managers_storenotes(req, res, next)
    {
        const formData = req.body      
        const newInfo = new Notes(formData)
        newInfo.save()
            .then(() => res.redirect('/managers/notes'))
            .catch(next)
    }

    managers_storeproducts(req, res, next)
    {
        const formData = req.body      
        const newInfo = new Products(formData)
        newInfo.save()
            .then(() => res.redirect('/managers/products'))
            .catch(next)
    }

    managers_editstaffs(req, res, next)
    {
        DatabaseInfo.findByIdAndUpdate(req.params.id)
            .then(csw_info => res.render('/managers/staffs', {
                csw_info: mongooseToObject(csw_info)
            }))
            .catch(next)
    }

    managers_updatestaffs(req, res, next)
    {
        DatabaseInfo.updateMany({_id: req.params.id}, req.body)
            .then(() => res.redirect('/managers/staffs'))
            .catch(next)
    }

    // [GET] /:slug
    show(req, res)
    {
        res.send('Test this dashboard');
    }
}

module.exports = new DashboardController