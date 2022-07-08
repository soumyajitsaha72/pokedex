import { Pokemon } from 'src/app/models/pokemon.model';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it("should return the resultant array", () => {
    const pipe = new SearchPipe();
    expect(pipe.transform([
      new Pokemon(1,'pikachu',7,8,['fly','dance'],['grass'],[1,2,3]),
      new Pokemon(2,'raichu',7,8,['fly','dance'],['grass'],[1,2,3]),
      new Pokemon(3,'piggy',7,8,['fly','dance'],['grass'],[1,2,3]),
      new Pokemon(4,'bulbasaur',7,8,['fly','dance'],['grass'],[1,2,3])
    ],'bulba')).toEqual([
      new Pokemon(4,'bulbasaur',7,8,['fly','dance'],['grass'],[1,2,3])
    ])
  })
});
