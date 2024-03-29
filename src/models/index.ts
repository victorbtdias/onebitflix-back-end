import { Category } from "./Category";
import { Course } from "./Course";
import { Document } from "./Document";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

Category.hasMany(Course, { as: "courses" });

Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Episode, { as: "episodes" });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);
Episode.belongsToMany(User, { through: WatchTime });

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.belongsToMany(Episode, { through: WatchTime });
User.hasMany(Favorite, { as: "FavoriteCourses", foreignKey: "user_id" });
User.hasMany(Document, { as: "UserDocuments", foreignKey: "user_id" });

Document.belongsTo(User);

export { Category, Course, Document, Episode, Favorite, Like, User, WatchTime };
