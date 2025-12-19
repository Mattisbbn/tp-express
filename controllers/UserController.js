const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminController = {




    index: async (req, res, next) => {
        try {
            const allUsers = await prisma.users.findMany();

            res.render("pages/admin/dashboard/users/index.ejs", {
                title: 'Liste des utilisateurs',
                users: allUsers
            });
        } catch (error) {
            next(error);
        }
    },

    view: async (req, res, next) => {
        const userId = parseInt(req.params.id);
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            });

            res.render("pages/admin/dashboard/users/view.ejs", {
                title: 'Liste des utilisateurs',
                user
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = adminController;