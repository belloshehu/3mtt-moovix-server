import HTTPException from "@/exceptions/http.exception";
import { ISavedDecoration } from "@/interfaces/saved-decoration.interface";
import SavedDecorationModel from "@/models/saved-decoration.model";
import { StatusCodes } from "http-status-codes";
import { Schema } from "mongoose";

class SavedDecorationService {
	// Add your service methods here
	// For example, you can add methods to create, read, update, and delete saved decorations

	savedDecorationModel = SavedDecorationModel;

	// create a new saved decoration
	async createSavedDecoration(
		savedDecorationData: ISavedDecoration
	): Promise<ISavedDecoration> {
		if (!savedDecorationData) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Invalid saved decoration data"
			);
		}
		const savedDecoration = await this.savedDecorationModel.create(
			savedDecorationData
		);
		return savedDecoration;
	}

	// get all saved decorations by User
	async getAllSavedDecorationsByWorkspace(
		userId: string,
		workspaceId: string
	): Promise<ISavedDecoration[]> {
		const savedDecorations = await this.savedDecorationModel.find({
			user: userId,
			workspace: workspaceId,
		});
		return savedDecorations;
	}

	// get a saved decoration by ID
	async getSavedDecorationById(id: string): Promise<ISavedDecoration | null> {
		if (!id) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide saved decoration  ID"
			);
		}
		const savedDecoration = await this.savedDecorationModel.findById(id);
		return savedDecoration;
	}

	// update a saved decoration by ID
	async updateSavedDecoration(
		id: string,
		updatedData: Partial<ISavedDecoration>
	): Promise<ISavedDecoration | null> {
		if (!id) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide saved decoration  ID"
			);
		}
		const updatedSavedDecoration =
			await this.savedDecorationModel.findByIdAndUpdate(id, updatedData, {
				new: true,
			});
		return updatedSavedDecoration;
	}

	// delete a saved decoration by ID
	async deleteSavedDecoration(id: string): Promise<ISavedDecoration | null> {
		if (!id) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide saved decoration  ID"
			);
		}
		const deletedSavedDecoration =
			await this.savedDecorationModel.findByIdAndDelete(id);
		return deletedSavedDecoration;
	}

	// Add any other methods you need for your service
}

export default SavedDecorationService;
