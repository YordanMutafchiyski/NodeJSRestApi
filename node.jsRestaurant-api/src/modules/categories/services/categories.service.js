module.exports = ({ models: { Category, Product } }) => {
  const getCategories = async () => {
    const result = await Category.findAll({
      where: {
        parentId: null,
        
      },
      include: [
        {
          model: Product,
        },
        {
          model: Category,
          as: 'children',
          required: false,
          where: {
            
          },
          include: [
            {
              model: Product,
            },
            {
              model: Category,
              required: false,
              where: {
                
              },
              as: 'children',
              include: {
                model: Product,
              },
            },
          ],
        },
      ],
    });
    return result
  };

  const createCategory = async (categoryData) => {
    const category = await Category.findOne({
      where: {
        name: categoryData.name,
      },
    });

    if (category) {
      throw new Error('A category with that name already exists!');
    }
    let parentCategory = await Category.findOne({
      where: {
        id: categoryData.parentId,
      },
    });
    let parentCategorySecondLevel;
    if (parentCategory) {
      parentCategorySecondLevel = await Category.findOne({
        where: {
          id: parentCategory.parentId,
        },
      });
    }
    let parentCategoryThirdLevel;
    if (parentCategorySecondLevel) {
      parentCategoryThirdLevel = await Category.findOne({
        where: {
          id: parentCategorySecondLevel.parentId,
        },
      });
    }
    if (parentCategoryThirdLevel) {
      throw new Error('Cannot add subcategory to third level');
    }

    return Category.create(categoryData);
  };

  const deleteCategory = async (id) => {
    const category = await Category.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error('A category with that id does not exist!');
    }

    return await category.destroy();
  };

  const updateCategory = async (id, payload) => {
    const category = await Category.findOne({
      where: {
        id,
      },
      returning: true,
    });
    if (!category) {
      throw new Error('A category with that id does not exist!');
    }
    return category.update(payload);
  };

  const getCategory = async (id) => {
    return await Category.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: 'children',
          include: [
            {
              model: Category,
              as: 'children',
              include: {
                model: Product,
              },
            },
            {
              model: Product,
            },
          ],
        },
        {
          model: Product,
        },
      ],
    });
  };
  return {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    getCategory,
  };
};
