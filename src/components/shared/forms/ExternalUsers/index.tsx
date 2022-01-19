import React, {useCallback, useMemo, useState} from 'react';
import shortid from 'shortid';

import {Button} from '~/components';
import {AlarmIcon} from '~/assets';

import {IExternalUsers} from './types';
import ExternalUser from './ExternalUser';
import styles from './ExternalUsersForm.module.scss';

const ExternalUsersForm: React.FC = () => {
  const [usersList, setUsersList] = useState<IExternalUsers[]>([
    {
      emails: '',
      role: 'Viewer',
      id: shortid.generate(),
    },
  ]);

  const handleSelector = useCallback(
    (shownName: string, id: string) => {
      setUsersList(
        usersList.map((el) => {
          if (el.id === id) {
            return {
              ...el,
              role: shownName,
            };
          }

          return el;
        }),
      );
    },
    [usersList],
  );

  const handleAddUser = useCallback(() => {
    setUsersList([
      ...usersList,
      {
        id: shortid.generate(),
        emails: '',
        role: 'Viewer',
      },
    ]);
  }, [usersList]);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<any>, id: string) => {
      setUsersList(
        usersList.map((el) => {
          if (el.id === id) {
            return {
              ...el,
              emails: e.target.value,
            };
          }

          return el;
        }),
      );
    },
    [usersList],
  );

  const users = useMemo(
    () =>
      usersList.map(({emails, role, id}) => (
        <ExternalUser
          id={id}
          key={id}
          role={role}
          emails={emails}
          handleSelector={handleSelector}
          handleEmailChange={handleEmailChange}
        />
      )),
    [handleEmailChange, handleSelector, usersList],
  );

  return (
    <React.Fragment>
      <div className={styles.container}>{users}</div>

      <div className={styles.container__block__add}>
        <span>
          <AlarmIcon />
        </span>
        <Button
          variant="ghost"
          onClick={handleAddUser}
          className={styles.container__block__add__btn}>
          Add more
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ExternalUsersForm;
