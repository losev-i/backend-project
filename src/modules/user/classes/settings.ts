/**
 * Class representing the user settings definition
 */
export class UserSettings {
  /** The database id of the doc */
  id!: number;
  /** The creation date of the doc */
  created!: Date;
  /** The last modification date of the doc */
  modified?: Date;
  /** The last modifier of the doc */
  modifiedBy?: string;
  /** The user id whom the settings belong to */
  userId?: number;
  /** Whether the user is archived */
  archived!: boolean;
}
