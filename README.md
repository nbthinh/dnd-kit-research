# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Ghi chú 

### props

- Nó yêu cầu bạn phải truyền cho nó 1 array đã được sắp xếp của các định danh duy nhất liên kết với các phần tử sử dụng hook `useSortable` bên trong nó.

```
import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

function App() {
  const [items] = useState([1, 2, 3]);

  return (
    <DndContext>
      <SortableContext items={items}>
        {/* ... */}
      </SortableContext>
    </DndContext>
  );
}
```

### Chiến lược (Strategies)

- Component `SortableContext` cũng chấp nhận những chiến thuật sắp xếp khác để tính toán các chuyển đổi cho hook `useSortable`. Các chiến thuật được xây dựng thẳng bao gồm:
    - rectSortingStrategy: Đây là giá trị mặc định, và phù hợp cho hầu hết các trường hợp sử dụng. Chiến thuật này không hỗ trợ các danh sách được ảo hoá.
    - verticalListSortingStrategy: Chiến thuật này được tối ưu hoá cho các danh sách nằm ngang và hỗ trợ cho các danh sách được ảo hoá.
    - horizontalListSortingStrategy: Chiến thuật này được tối ưu hoá cho các danh sách nằm dọc và hỗ trợ cho các danh sách được ảo hoá.
    rectSwappingStrategy: Sử dụng chiến thuật này để đạt được tính năng đổi chỗ.
- Hãy đảm bảo sử dụng chiến lược sắp xếp phù hợp nhất với trường hợp sử dụng mà bạn đang xây dựng.
- Đối với các trường hợp sử dụng nâng cao, bạn cũng có thể xây dựng các chiến lược sắp xếp tùy chỉnh. Để thực hiện việc này, hãy đảm bảo rằng chiến lược tùy chỉnh mà bạn đang xây dựng chấp nhận các đối số được truyền vào chiến lược sắp xếp và tuân thủ các giá trị trả về được mong đợi. Để biết thêm chi tiết về điều này, hãy tham khảo phần triển khai các chiến lược sắp xếp tích hợp sẵn.

### Identifier

- Component `SortableContext` cũng chấp nhận props id 1 cách tuỳ ý. Nếu 1 id không được cung cấp, nó sẽ tự động sinh ra cho bạn. Prop id cho các trường hợp nâng cao. Nếu bạn đang xây dựng các cảm biến tuỳ chỉnh (sensors), bạn sẽ có truy cập tới mỗi dữ liệu prop của phần tử có thể sắp xếp, nó sẽ chưa containerId liên kết tới các ngữ cảnh của sortable context.

### Cách sử dụng 

- Bạn có thể lồng nhiều providers `SortableContext` bên trong cùng 1 provider `DndContext`
- Bạn cũng có thể lồng nhiều providers `SortableContext` bên trong nhiều providers `SortableContext` khác, hoặc tất cả dưới cùng 1 provider `DndContext` hoặc mỗi cái với các providers riêng biệt của chính nó nếu bạn muốn cấu hình chúng với các tuỳ chọn khác nhau:

```
// Bad, missing parent <DndContext>
<SortableContext>
  {/* ... */}
</SortableContext>

// Good, basic setup
<DndContext>
  <SortableContext>
    {/* ... */}
  </SortableContext>
</DndContext>

// Good, multiple sibling Sortable contexts
<DndContext>
  <SortableContext>
    {/* ... */}
  </SortableContext>
  <SortableContext>
    {/* ... */}
  </SortableContext>
</DndContext>

// Good, nested DndContexts
<DndContext>
  <SortableContext items={["A, "B", "C"]}>
    <DndContext>
      <SortableContext items={["A, "B", "C"]}>
        {/* ... */}
      </SortableContext>
    </DndContext>
  </SortableContext>
</DndContext>

// Bad, nested Sortable contexts with `id` collisions
<DndContext>
  <SortableContext items={["A, "B", "C"]}>
    <SortableContext items={["A, "B", "C"]}>
      {/* ... */}
    </SortableContext>
  </SortableContext>
</DndContext>

// Good, nested Sortable contexts with unique `id`s
<DndContext>
  <SortableContext items={["A, "B", "C"]}>
    <SortableContext items={[1, 2, 3]}>
      {/* ... */}
    </SortableContext>
  </SortableContext>
</DndContext>
```