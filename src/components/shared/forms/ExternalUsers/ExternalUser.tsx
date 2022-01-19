import React, {useState, useRef, useMemo} from 'react';

import {AlarmIcon} from '~/assets';
import {userSelect} from '~/constants';
import {useOnClickOutside} from '~/hooks';
import {Input, Button} from '~/components';

import {IExternalUser} from './types';
import styles from './ExternalUsersForm.module.scss';

const ExternalUser: React.FC<IExternalUser> = ({
  id,
  role,
  emails,
  handleSelector,
  handleEmailChange,
}) => {
  const userExpandedRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectOutsideClick = () => {
    setIsExpanded(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  useOnClickOutside(userExpandedRef, handleSelectOutsideClick);

  const users = useMemo(
    () =>
      userSelect.map(({shownName, id: roleId}) => (
        <div
          key={roleId}
          onClick={() => {
            handleSelector(shownName, id);
            handleSelectOutsideClick();
          }}
          className={styles.container__expanded__box}>
          {shownName}
        </div>
      )),
    [handleSelector, id],
  );

  return (
    <div key={id} className={styles.container__block}>
      <div className={styles.container__block__input}>
        <Input
          name="Input"
          value={emails}
          label="Enter email"
          placeholder="User's email"
          onChange={(e: any) => handleEmailChange(e, id)}
        />
      </div>

      <div ref={userExpandedRef} className={styles.container__click}>
        <Button
          data-open
          variant="ghost"
          onClick={handleExpand}
          className={styles.container__click__button}>
          {role}
        </Button>
        <span>
          <AlarmIcon
            onClick={handleExpand}
            style={{
              transform: `rotate(${isExpanded ? 180 : 0}deg)`,
            }}
          />
        </span>

        {isExpanded && (
          <div className={styles.container__expanded}>{users}</div>
        )}
      </div>
    </div>
  );
};

export default ExternalUser;
