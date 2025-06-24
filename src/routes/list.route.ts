import ListController from "@/controllers/list.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
	addListItemValidationSchema,
	listCreateValidationSchema,
} from "@/schemas/List.validation.schema";
import { Router } from "express";

class ListRoutes implements Routes {
	path = "/lists";
	router = Router();
	listController = new ListController();

	constructor() {
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Define your list routes here

		this.router.post(
			`${this.path}`,
			[
				authMiddleware,
				validationMiddleware(listCreateValidationSchema, "body"),
			],
			this.listController.createList
		);
		this.router.get(
			`${this.path}/:listId`,
			authMiddleware,
			this.listController.getListById
		);
		this.router.get(
			`${this.path}`,
			authMiddleware,
			this.listController.getAllLists
		);
		this.router.patch(
			`${this.path}/:listId`,
			[
				authMiddleware,
				validationMiddleware(listCreateValidationSchema, "body"),
			],
			this.listController.updateList
		);
		this.router.delete(
			`${this.path}/:listId`,
			authMiddleware,
			this.listController.deleteList
		);
		this.router.post(
			`${this.path}/:listId/add`,
			[
				authMiddleware,
				validationMiddleware(addListItemValidationSchema, "body"),
			],
			this.listController.addItemToList
		);
		this.router.delete(
			`${this.path}/:listId/remove/:movieId`,
			authMiddleware,
			this.listController.removeItemFromList
		);
	}
}

export default ListRoutes;
