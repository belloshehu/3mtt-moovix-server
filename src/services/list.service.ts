import HTTPException from "@/exceptions/http.exception";
import { IList } from "@/interfaces/list.interface";
import ListModel from "@/models/list.model";
import { ListCreateDto, ListUpdateDto } from "@/schemas/List.validation.schema";
import { MovieDto } from "@/schemas/movie.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";
import MovieService from "./movie.service";

class ListService {
	private listModel = ListModel;
	private movieService = new MovieService();
	// Define methods for list service here
	// For example, methods to create, update, delete, and fetch lists
	public createList = async (
		userId: string,
		listData: ListCreateDto
	): Promise<IList> => {
		const newList = await this.listModel.create({ user: userId, ...listData });
		return newList;
	};

	public getListById = async (listId: string): Promise<IList> => {
		if (isEmpty(listId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "List ID is required");
		}
		const list = await this.listModel.findById(listId).populate("items");
		if (!list) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "List not found");
		}
		return list;
	};

	public getAllLists = async (userid: string): Promise<IList[]> => {
		const lists = await this.listModel.find({ user: userid }).populate("items");
		return lists;
	};

	public updateList = async (
		listId: string,
		updateData: ListUpdateDto
	): Promise<IList> => {
		if (isEmpty(listId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "List ID is required");
		}
		const list = await this.listModel.findByIdAndUpdate(listId, updateData, {
			new: true,
			runValidators: true,
		});
		if (!list) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "List not found");
		}
		return list;
	};

	// delete a list
	public deleteList = async (listId: string): Promise<IList> => {
		if (isEmpty(listId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "List ID is required");
		}
		const deletedList = await this.listModel.findByIdAndDelete(listId);
		if (!deletedList) {
			throw new Error("List not found");
		}
		return deletedList;
	};

	// add item to list
	public addItemToList = async (
		listId: string,
		itemData: MovieDto
	): Promise<any> => {
		let list: IList | null = await this.getListById(listId);
		if (!list) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "List not found");
		}

		// add item to movie collection if it doesn't exist
		let existingItem = await this.movieService.getMovie(itemData.id);
		if (!existingItem) {
			existingItem = await this.movieService.createMovie(itemData);
			if (!existingItem) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					"Failed to create movie"
				);
			}
		}

		// update set of items with the new item
		list = await this.listModel.findByIdAndUpdate(
			listId,
			{ $addToSet: { items: existingItem._id } },
			{ new: true, runValidators: true }
		);
		if (!list) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Failed to update list");
		}
		return list;
	};

	public removeItemFromList = async (
		listId: string,
		itemId: string
	): Promise<any> => {
		if (isEmpty(listId) || isEmpty(itemId)) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"List ID and Item ID are required"
			);
		}
		const list = await this.listModel.findByIdAndUpdate(
			listId,
			{ $pull: { items: itemId } },
			{ new: true, runValidators: true }
		);
		return list;
	};
}

export default ListService;
