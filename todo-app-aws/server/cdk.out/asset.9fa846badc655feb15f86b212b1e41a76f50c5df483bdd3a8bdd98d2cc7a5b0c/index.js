"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTodo_1 = require("./addTodo");
const deleteTodo_1 = require("./deleteTodo");
const getTodo_1 = require("./getTodo");
exports.handler = async (event) => {
    switch (event.info.fieldName) {
        case "addTodo":
            return await addTodo_1.default(event.arguments.todo);
        case "deleteTodo":
            return await deleteTodo_1.default(event.arguments.id);
        case "todos":
            return await getTodo_1.default();
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnQztBQUNoQyw2Q0FBc0M7QUFFdEMsdUNBQThCO0FBaUI5QixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFtQixFQUFFLEVBQUU7SUFDNUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUUxQixLQUFLLFNBQVM7WUFDVixPQUFPLE1BQU0saUJBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLEtBQUssWUFBWTtZQUNiLE9BQU8sTUFBTSxvQkFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEQsS0FBSyxPQUFPO1lBQ1IsT0FBTyxNQUFNLGlCQUFLLEVBQUUsQ0FBQztRQUN6QjtZQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZFRvZG8gZnJvbSAnLi9hZGRUb2RvJztcclxuaW1wb3J0IGRlbGV0ZVRvZG8gZnJvbSAnLi9kZWxldGVUb2RvJztcclxuXHJcbmltcG9ydCB0b2RvcyBmcm9tICcuL2dldFRvZG8nO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nO1xyXG5cclxudHlwZSBBcHBTeW5jRXZlbnQgPSB7XHJcbiAgICBpbmZvOiB7XHJcbiAgICAgICAgZmllbGROYW1lOiBzdHJpbmdcclxuICAgIH0sXHJcbiAgICBhcmd1bWVudHM6IHtcclxuICAgICAgICB0b2RvSWQ6IHN0cmluZyxcclxuICAgICAgICB0b2RvOiBUb2RvLFxyXG4gICAgICAgIGlkOiBzdHJpbmdcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBcHBTeW5jRXZlbnQpID0+IHtcclxuICAgIHN3aXRjaCAoZXZlbnQuaW5mby5maWVsZE5hbWUpIHtcclxuXHJcbiAgICAgICAgY2FzZSBcImFkZFRvZG9cIjpcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGFkZFRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pO1xyXG4gICAgICAgIGNhc2UgXCJkZWxldGVUb2RvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBkZWxldGVUb2RvKGV2ZW50LmFyZ3VtZW50cy5pZCk7XHJcbiAgICAgICAgY2FzZSBcInRvZG9zXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0b2RvcygpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59Il19