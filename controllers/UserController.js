const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserController = {
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
 
    try {
 

      res.render("pages/admin/dashboard/users/view.ejs", {
        title: "Liste des utilisateurs",
      
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
  create: async (req, res, next) => {
    try {
      const { email, name, role } = req.body;

      const newUser = await prisma.users.create({
        data: {
          name:name,
          email:email,
          role:role,
        }
      });

      return res.status(201).json({
        success: true,
        message: "Utilisateur créé avec succès",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création de l'utilisateur",
        error: error.message,
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const { email, name, role } = req.body;

      const updatedUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          email: email,
          role: role,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Utilisateur modifié avec succès",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la modification de l'utilisateur",
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
