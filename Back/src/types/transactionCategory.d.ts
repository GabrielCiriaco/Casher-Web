import { Transactions } from "entities/Transactions";
import { Categories } from "entities/Categories";

export interface TransactionsCategories{
    transaction: Transactions;
    category_type: Categories['type'];
    category_name: Categories['name'];

}