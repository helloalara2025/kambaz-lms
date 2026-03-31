/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    USER DAO - Data Access Object                          ║
 * ║                         Created by Alara                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * The DAO pattern keeps my database logic separate from my routes.
 * All MongoDB queries for users live here - clean and organized!
 */

import UserModel from "./model.js";

// ═══════════════════════════════════════════════════════════════════════════
// CRUD OPERATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const findAllUsers = () => UserModel.find();

export const findUserById = (userId) => UserModel.findOne({ _id: userId });

export const findUserByUsername = (username) => UserModel.findOne({ username });

export const findUserByCredentials = (username, password) => 
  UserModel.findOne({ username, password });

export const createUser = (user) => {
  const newUser = { ...user, _id: user._id || new Date().getTime().toString() };
  return UserModel.create(newUser);
};

export const updateUser = (userId, user) => 
  UserModel.findOneAndUpdate({ _id: userId }, { $set: user }, { new: true });

export const deleteUser = (userId) => UserModel.findOneAndDelete({ _id: userId });

export const findUsersByRole = (role) => UserModel.find({ role });
