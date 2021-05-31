import React from "react";

import { FlatList } from "react-native-gesture-handler";

import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

interface ICategory {
  key: string;
  name: string;
}

interface Props {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props): JSX.Element {
  function handleCategorySelect(_category: ICategory) {
    setCategory(_category);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
