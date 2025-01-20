import { makeAutoObservable, runInAction } from "mobx";
import { getPage } from "../api";
import { IItem } from "../types";
type ErrType = { message: string };

class DataStore {
  results: any[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  error: ErrType = {} as ErrType;
  hasNextPage: boolean = false;
  pageNumber: number = 1;
  isEditingError = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };

  setResults = (value: any) => {
    this.results = value;
  };

  setHasNextPage = (value: boolean) => {
    this.hasNextPage = value;
  };

  setIsError = (value: boolean) => {
    this.isError = value;
  };

  setError = (value: ErrType) => {
    this.error = value;
  };

  setIsEditingError = (value: boolean) => {
    this.isEditingError = value;
  };
  setPageNumber = (value: number) => {
    this.pageNumber = value;
  };

  getPageAction = async () => {
    runInAction(() => {
      this.setIsLoading(true);
      this.setIsError(false);
      this.setError({} as ErrType);
    });

    const controller = new AbortController();
    const { signal } = controller;

    try {
      const data = await getPage(this.pageNumber, { signal });
      runInAction(() => {
        this.setResults([...this.results, ...data]);
        this.setIsLoading(false);
        this.setHasNextPage(Boolean(data.length));
      });
    } catch (e: any) {
      runInAction(() => {
        this.setIsLoading(false);
        if (signal.aborted) return;
        this.setIsError(true);
        this.setError({ message: e.message });
      });
    }

    controller.abort();
  };

  deleteElement = (id: number) => {
    try {
      this.setResults(this.results.filter((value) => value.id !== id));
      this.setIsEditingError(false);
    } catch (e) {
      this.setIsEditingError(true);
    }
  };

  editElement = (data: IItem) => {
    const index = this.results.findIndex((value) => value.id === data.id);
    if (index !== undefined) {
      try {
        const newResult = [...this.results];
        newResult[index] = { ...data };
        this.setResults(newResult);
        this.setIsEditingError(false);
      } catch (e) {
        this.setIsEditingError(true);
      }
    } else this.setIsEditingError(true);
  };

  incrementPage = () => {
    this.setPageNumber(this.pageNumber + 1);
  };
}

export default new DataStore();
