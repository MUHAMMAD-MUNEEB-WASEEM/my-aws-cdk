"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTodo_1 = require("./addTodo");
const getTodo_1 = require("./getTodo");
exports.handler = async (event) => {
    switch (event.info.fieldName) {
        case "addTodo":
            return await addTodo_1.default(event.arguments.todo);
        case "todos":
            return await getTodo_1.default();
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnQztBQUVoQyx1Q0FBOEI7QUFnQjlCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQW1CLEVBQUUsRUFBRTtJQUM1QyxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBRTFCLEtBQUssU0FBUztZQUNWLE9BQU8sTUFBTSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsS0FBSyxPQUFPO1lBQ1IsT0FBTyxNQUFNLGlCQUFLLEVBQUUsQ0FBQztRQUN6QjtZQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZFRvZG8gZnJvbSAnLi9hZGRUb2RvJztcclxuXHJcbmltcG9ydCB0b2RvcyBmcm9tICcuL2dldFRvZG8nO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nO1xyXG5cclxudHlwZSBBcHBTeW5jRXZlbnQgPSB7XHJcbiAgICBpbmZvOiB7XHJcbiAgICAgICAgZmllbGROYW1lOiBzdHJpbmdcclxuICAgIH0sXHJcbiAgICBhcmd1bWVudHM6IHtcclxuICAgICAgICB0b2RvSWQ6IHN0cmluZyxcclxuICAgICAgICB0b2RvOiBUb2RvXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQXBwU3luY0V2ZW50KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmluZm8uZmllbGROYW1lKSB7XHJcblxyXG4gICAgICAgIGNhc2UgXCJhZGRUb2RvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBhZGRUb2RvKGV2ZW50LmFyZ3VtZW50cy50b2RvKTtcclxuICAgICAgICBjYXNlIFwidG9kb3NcIjpcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRvZG9zKCk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iXX0=