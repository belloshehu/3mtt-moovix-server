import { RequestWithUser } from "@/interfaces/auth.interface";
import ListService from "@/services/list.service";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

class ListController {
	private listService = new ListService();

	public createList = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const listData = req.body;
			const newList = await this.listService.createList(
				req.user?._id,
				listData
			);
			res
				.status(StatusCodes.CREATED)
				.json({ data: newList, message: "List created successfully" });
		} catch (error) {
			next(error);
		}
	};

	// get list by id
	public getListById = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { listId } = req.params;
			const list = await this.listService.getListById(listId);
			res
				.status(StatusCodes.OK)
				.json({ data: list, message: "List fetched successfully" });
		} catch (error) {
			next(error);
		}
	};

	public getAllLists = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const lists = await this.listService.getAllLists(req.user?._id);
			res
				.status(StatusCodes.OK)
				.json({ data: lists, message: "All lists fetched successfully" });
		} catch (error) {
			next(error);
		}
	};

	public updateList = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { listId } = req.params;
			const updateData = req.body;
			const updatedList = await this.listService.updateList(listId, updateData);
			res
				.status(StatusCodes.OK)
				.json({ data: updatedList, message: "List updated successfully" });
		} catch (error) {
			next(error);
		}
	};

	public deleteList = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { listId } = req.params;
			const deletedList = await this.listService.deleteList(listId);
			res
				.status(StatusCodes.OK)
				.json({ data: deletedList, message: "List deleted successfully" });
		} catch (error) {
			next(error);
		}
	};

	public addItemToList = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { listId } = req.params;
			const itemData = req.body;
			const updatedList = await this.listService.addItemToList(
				listId,
				itemData
			);
			res.status(StatusCodes.OK).json({
				data: updatedList,
				message: "Item added to list successfully",
			});
		} catch (error) {
			next(error);
		}
	};

	public removeItemFromList = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { listId, itemId } = req.params;
			const updatedList = await this.listService.removeItemFromList(
				listId,
				itemId
			);
			res.status(StatusCodes.OK).json({
				data: updatedList,
				message: "Item removed from list successfully",
			});
		} catch (error) {
			next(error);
		}
	};
}

export default ListController;
