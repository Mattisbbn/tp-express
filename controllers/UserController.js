const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const adminController = {
  index: async (req, res, next) => {
    try {
      res.render("pages/admin/dashboard/users/index.ejs", {
        title: "Liste des utilisateurs",
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
          id: userId,
        },
      });

      res.render("pages/admin/dashboard/users/view.ejs", {
        title: "Liste des utilisateurs",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const allUsers = await prisma.users.findMany();

      return res.status(200).json({
        success: true,
        count: allUsers.length,
        data: allUsers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des utilisateurs",
        error: error.message,
      });
    }
  },
  getOne: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);

      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if(!user) throw new Error("L'utilisateur n'existe pas !")

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération de l'utilisateurs",
        error: error.message,
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);

      await prisma.users.delete({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de l'utilisateurs",
        error: error.message,
      });
    }
  },
};

module.exports = adminController;
