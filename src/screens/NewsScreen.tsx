import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { fetchNews } from '../services/newsService';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`;

const ArticleCard = styled.View`
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 10px;
  background-color: #f0f0f0;
`;

const ArticleTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ArticleSource = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

const NewsScreen = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setArticles(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ArticleCard>
            <ArticleTitle>{item.title}</ArticleTitle>
            <ArticleSource>{item.source.name}</ArticleSource>
          </ArticleCard>
        )}
      />
    </Container>
  );
};

export default NewsScreen;